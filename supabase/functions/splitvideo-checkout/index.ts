import { createClient } from "npm:@supabase/supabase-js@2.118.0";

const allowedOrigins = new Set([
  "https://www.splitvideo.in",
  "https://splitvideo.in",
  "https://splitvideo-web-git-codex-paid-access-foundation-deep-07f0.vercel.app",
  ...(Deno.env.get("CHECKOUT_ALLOWED_ORIGINS") ?? "").split(",").filter(Boolean),
]);
const env = Deno.env.get("DODO_PAYMENTS_ENVIRONMENT") ?? "test_mode";
if (env === "test_mode") {
  allowedOrigins.add("http://localhost:8080");
  allowedOrigins.add("http://127.0.0.1:8080");
  allowedOrigins.add("http://127.0.0.1:8081");
}
const apiBase =
  env === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
const configured = () =>
  Boolean(
    Deno.env.get("DODO_PAYMENTS_API_KEY") &&
    Deno.env.get("DODO_PRODUCT_ID") &&
    Deno.env.get("DODO_WEBHOOK_SECRET") &&
    ["test_mode", "live_mode"].includes(env),
  );
Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Headers"] = "authorization, apikey, content-type, x-client-info";
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
  }
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers });
  if (req.method === "OPTIONS")
    return new Response(null, { status: allowedOrigins.has(origin) ? 204 : 403, headers });
  if (req.method === "GET") return json({ ready: configured(), environment: env });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!allowedOrigins.has(origin)) return json({ error: "Origin not allowed" }, 403);
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return json({ error: "Please sign in" }, 401);
  try {
    const db = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const {
      data: { user },
      error,
    } = await db.auth.getUser(auth.slice(7));
    if (error || !user || user.is_anonymous || !user.email)
      return json({ error: "Please sign in with Google" }, 401);
    if (!configured()) return json({ error: "Purchases are not open yet" }, 503);
    const { data: grants, error: accessError } = await db
      .from("access_grants")
      .select("order_id")
      .eq("user_id", user.id)
      .eq("product_key", "splitvideo")
      .eq("environment", env)
      .eq("active", true)
      .limit(1);
    if (accessError) throw accessError;
    if (grants?.length) return json({ error: "You already have access. Open the studio." }, 409);
    // Bound repeated attempts per signed-in account; never accept client pricing/user IDs.
    const { count, error: countError } = await db
      .from("purchase_orders")
      .select("id", { head: true, count: "exact" })
      .eq("user_id", user.id)
      .gte("created_at", new Date(Date.now() - 3600000).toISOString());
    if (countError) throw countError;
    if ((count ?? 0) >= 5)
      return json({ error: "Too many checkout attempts. Please try again later." }, 429);
    const product = Deno.env.get("DODO_PRODUCT_ID")!;
    const { data: order, error: insertError } = await db
      .from("purchase_orders")
      .insert({
        user_id: user.id,
        product_key: "splitvideo",
        dodo_product_id: product,
        environment: env,
      })
      .select("id")
      .single();
    if (insertError) throw insertError;
    const response = await fetch(`${apiBase}/checkouts`, {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${Deno.env.get("DODO_PAYMENTS_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_cart: [{ product_id: product, quantity: 1 }],
        customer: { email: user.email },
        metadata: { order_id: order.id, product_key: "splitvideo" },
        return_url: `${origin}/account?checkout=returned`,
      }),
    });
    if (!response.ok) return json({ error: "Could not start checkout. Please try again." }, 502);
    const checkout = await response.json();
    const url = new URL(checkout.checkout_url);
    const host =
      env === "live_mode" ? "checkout.dodopayments.com" : "test.checkout.dodopayments.com";
    if (url.protocol !== "https:" || url.hostname !== host)
      throw new Error("Invalid checkout destination");
    const { error: saveError } = await db
      .from("purchase_orders")
      .update({ checkout_url: url.href })
      .eq("id", order.id);
    if (saveError) throw saveError;
    return json({ checkout_url: url.href });
  } catch {
    return json({ error: "Checkout is temporarily unavailable. Please try again." }, 503);
  }
});
