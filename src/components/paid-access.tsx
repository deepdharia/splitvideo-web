import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { billingEnvironment, getSupabase, hasPaidAccess } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const Splitter = lazy(() =>
  import("@/components/splitter-app").then((m) => ({ default: m.SplitterApp })),
);

export function PaidAccess({ studio = false }: { studio?: boolean }) {
  const revision = useRef(0);
  const accountId = useRef<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [googleReady, setGoogleReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const refresh = useCallback(async () => {
    const current = ++revision.current;
    setError("");
    try {
      const supabase = getSupabase();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      const paid = session ? await hasPaidAccess() : false;
      if (current !== revision.current) return;
      accountId.current = session?.user.id ?? null;
      setUser(session?.user ?? null);
      setAccess(paid);
      setChecked(true);
    } catch (e) {
      if (current === revision.current) {
        setAccess(false);
        setChecked(false);
        setError(message(e));
      }
    } finally {
      if (current === revision.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let unsubscribe = () => {};
    try {
      const supabase = getSupabase();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        // Run outside the auth callback lock, and clear previous access immediately.
        if (
          event === "SIGNED_OUT" ||
          (event === "SIGNED_IN" && session?.user.id !== accountId.current)
        ) {
          revision.current++;
          setAccess(false);
          setChecked(false);
        }
        timer = setTimeout(() => {
          if (!disposed) void refresh();
        }, 0);
      });
      unsubscribe = () => data.subscription.unsubscribe();
      void fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/settings`, {
        headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
      })
        .then((r) => r.json())
        .then((d) => {
          if (!disposed) setGoogleReady(d.external?.google === true);
        })
        .catch(() => {});
      void fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/splitvideo-checkout`, {
        headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
      })
        .then((r) => r.json())
        .then((d) => {
          if (!disposed) setReady(d.ready === true && d.environment === billingEnvironment);
        })
        .catch(() => {});
    } catch (e) {
      setError(message(e));
      setLoading(false);
    }
    void refresh();
    const focus = () => {
      void refresh();
    };
    window.addEventListener("focus", focus);
    return () => {
      disposed = true;
      revision.current++;
      clearTimeout(timer);
      unsubscribe();
      window.removeEventListener("focus", focus);
    };
  }, [refresh]);

  // A return URL is never proof of payment. Poll the verified database record.
  useEffect(() => {
    if (!user || access || !new URLSearchParams(window.location.search).has("checkout")) return;
    let attempts = 0;
    const timer = setInterval(() => {
      if (++attempts >= 12) clearInterval(timer);
      void refresh();
    }, 2500);
    return () => clearInterval(timer);
  }, [user?.id, access, refresh]);

  async function signIn() {
    setBusy(true);
    setError("");
    try {
      const { error } = await getSupabase().auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/account`,
          queryParams: { prompt: "select_account" },
        },
      });
      if (error) throw error;
    } catch {
      setError(
        "Google sign-in is not available yet. Please try again later or contact build@splitvideo.in.",
      );
      setBusy(false);
    }
  }
  async function buy() {
    setBusy(true);
    setError("");
    try {
      const { data, error } = await getSupabase().functions.invoke("splitvideo-checkout", {
        body: {},
      });
      if (error || !data?.checkout_url)
        throw new Error("Checkout is not available yet. Please try again shortly.");
      const url = new URL(data.checkout_url);
      if (
        url.protocol !== "https:" ||
        !["checkout.dodopayments.com", "test.checkout.dodopayments.com"].includes(url.hostname)
      )
        throw new Error("Could not open a secure checkout.");
      window.location.assign(url.href);
    } catch (e) {
      setError(message(e));
      setBusy(false);
    }
  }
  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const { error } = await getSupabase().auth.signOut();
      if (error) throw error;
      setAccess(false);
      setUser(null);
    } catch {
      setError("Could not sign out. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-6">
        <Link to="/" className="font-display text-xl font-semibold">
          SplitVideo
        </Link>
        <Link
          to={studio ? "/account" : "/studio"}
          className="text-sm text-muted hover:text-foreground"
        >
          {studio ? "My account" : "Open studio"}
        </Link>
      </header>
      {loading ? (
        <p className="p-10 text-center" role="status">
          Checking your account…
        </p>
      ) : studio && access ? (
        <Suspense
          fallback={
            <p className="p-10 text-center" role="status">
              Opening your studio…
            </p>
          }
        >
          <Splitter />
        </Suspense>
      ) : (
        <main className="mx-auto max-w-xl px-4 py-10">
          <section className="glass rounded-3xl p-7 sm:p-10">
            <p className="text-xs uppercase tracking-widest text-muted">Your SplitVideo account</p>
            <h1 className="mt-3 font-display text-3xl font-semibold">
              {access
                ? "You’re ready to split."
                : user
                  ? "One purchase. Your own studio."
                  : "Sign in to SplitVideo"}
            </h1>
            <p className="mt-4 text-sm leading-6 text-muted">
              {user
                ? `Signed in as ${user.email ?? "your Google account"}.`
                : "Use your Google account to buy access and return to your tool on another device. We don’t request access to your Gmail messages."}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {access
                ? "Your paid access is active. Your videos still stay on your device."
                : "SplitVideo is a paid tool. Signing in alone does not unlock video processing."}
            </p>
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-400/30 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {!user ? (
                <Button onClick={() => void signIn()} disabled={busy || !googleReady}>
                  {!googleReady
                    ? "Google sign-in opening soon"
                    : busy
                      ? "Opening Google…"
                      : "Continue with Google"}
                </Button>
              ) : access ? (
                <Button asChild>
                  <Link to="/studio">Open SplitVideo</Link>
                </Button>
              ) : (
                <Button onClick={() => void buy()} disabled={busy || !ready || !checked}>
                  {ready ? (busy ? "Opening checkout…" : "Buy access") : "Purchases opening soon"}
                </Button>
              )}
              {user && (
                <Button variant="outline" onClick={() => void refresh()} disabled={busy}>
                  Refresh access
                </Button>
              )}
              {user && (
                <Button variant="ghost" onClick={() => void signOut()} disabled={busy}>
                  Sign out
                </Button>
              )}
            </div>
            {user && !access && (
              <p className="mt-4 text-xs leading-5 text-muted">
                Already paid? Use the same Google account you signed in with before checkout, then
                refresh access. Payment confirmation can take a moment.
              </p>
            )}
            <p className="mt-6 text-xs text-muted">
              <Link to="/privacy" className="underline">
                Privacy
              </Link>{" "}
              ·{" "}
              <Link to="/terms" className="underline">
                Terms
              </Link>{" "}
              ·{" "}
              <a className="underline" href="mailto:build@splitvideo.in">
                Get help
              </a>
            </p>
          </section>
        </main>
      )}
    </>
  );
}
function message(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
