import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const billingEnvironment =
  import.meta.env.VITE_BILLING_ENVIRONMENT === "test_mode" ? "test_mode" : "live_mode";

let client: SupabaseClient | undefined;
export function getSupabase() {
  if (typeof window === "undefined") throw new Error("Sign-in is available in your browser.");
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Account setup is not available yet. Please try again later.");
  client ??= createClient(url, key, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}

export async function hasPaidAccess() {
  const supabase = getSupabase();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user || user.is_anonymous) return false;
  const { data, error } = await supabase
    .from("access_grants")
    .select("order_id")
    .eq("user_id", user.id)
    .eq("product_key", "splitvideo")
    .eq("environment", billingEnvironment)
    .eq("active", true)
    .limit(1);
  if (error) throw new Error("We could not verify your access. Please reconnect and try again.");
  return (data?.length ?? 0) > 0;
}
