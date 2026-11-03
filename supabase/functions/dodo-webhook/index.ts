import { createClient } from "npm:@supabase/supabase-js@2.118.0";
import { Webhook } from "npm:standardwebhooks@1.0.0";

const handled = new Set([
  "payment.succeeded",
  "refund.succeeded",
  "dispute.opened",
  "dispute.accepted",
  "dispute.lost",
  "dispute.expired",
]);
Deno.serve(async (req) => {
  const reply = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const secret = Deno.env.get("DODO_WEBHOOK_SECRET");
  const apiKey = Deno.env.get("DODO_PAYMENTS_API_KEY");
  const env = Deno.env.get("DODO_PAYMENTS_ENVIRONMENT") ?? "test_mode";
  if (!secret || !apiKey || !["test_mode", "live_mode"].includes(env))
    return reply({ error: "Webhook not configured" }, 503);
  if (Number(req.headers.get("content-length") ?? 0) > 262144)
    return reply({ error: "Payload too large" }, 413);
  const raw = await req.text();
  if (raw.length > 262144) return reply({ error: "Payload too large" }, 413);
  let event: { type: string; data: { payment_id?: string } };
  try {
    event = new Webhook(secret).verify(raw, {
      "webhook-id": req.headers.get("webhook-id") ?? "",
      "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
      "webhook-signature": req.headers.get("webhook-signature") ?? "",
    }) as typeof event;
  } catch {
    return reply({ error: "Invalid signature" }, 401);
  }
  if (!handled.has(event.type)) return reply({ ignored: true });
  if (!event.data?.payment_id) return reply({ error: "Payment ID missing" }, 400);
  try {
    // Reconcile against Dodo's authenticated API, not browser return parameters.
    const base =
      env === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
    const response = await fetch(`${base}/payments/${encodeURIComponent(event.data.payment_id)}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return reply({ error: "Payment verification unavailable" }, 503);
    const payment = await response.json();
    const orderId = payment.metadata?.order_id;
    if (payment.metadata?.product_key !== "splitvideo" || !orderId) return reply({ ignored: true });
    const db = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data: order, error } = await db
      .from("purchase_orders")
      .select("id,dodo_product_id,environment")
      .eq("id", orderId)
      .single();
    if (error || !order) return reply({ error: "Order not found" }, 503);
    if (
      order.environment !== env ||
      !payment.product_cart?.some(
        (p: { product_id: string; quantity: number }) =>
          p.product_id === order.dodo_product_id && p.quantity === 1,
      )
    )
      return reply({ error: "Product mismatch" }, 400);
    let status: string;
    if (
      event.type === "refund.succeeded" ||
      payment.refund_status === "full" ||
      payment.refund_status === "partial"
    )
      status = "refunded";
    else if (
      event.type.startsWith("dispute.") ||
      payment.disputes?.some(
        (d: { dispute_status?: string }) =>
          !["won", "cancelled", "challenged"].includes(d.dispute_status ?? ""),
      )
    )
      status = "disputed";
    else if (payment.status === "succeeded") status = "paid";
    else return reply({ error: "Payment not settled" }, 503);
    const { error: recordError } = await db.rpc("record_verified_payment", {
      p_event_id: req.headers.get("webhook-id"),
      p_event_type: event.type,
      p_order_id: order.id,
      p_payment_id: event.data.payment_id,
      p_product_id: order.dodo_product_id,
      p_environment: env,
      p_status: status,
    });
    if (recordError) return reply({ error: "Could not record payment; retry required" }, 503);
    return reply({ received: true });
  } catch {
    return reply({ error: "Payment verification temporarily unavailable" }, 503);
  }
});
