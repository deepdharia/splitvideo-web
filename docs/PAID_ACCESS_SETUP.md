# SplitVideo paid-access foundation

Status: preview only; do not merge or enable purchases until the launch checklist passes.

## Connected resources
- GitHub: deepdharia/splitvideo-web; branch codex/paid-access-foundation
- Vercel: splitvideo-web, project prj_HVjxElx41ISKAKQgEb5j0KOqrudD, team team_wvxSELhflUQaNOxbFlHrBhz0
- Supabase: SplitVideo, krziujxtmcjypezljniu, Mumbai, separate from GLARAL
- Production canonical origin: https://www.splitvideo.in

## Architecture
Public guide/landing pages → /account Google OAuth (PKCE) → authenticated Edge Function checkout → Dodo hosted payment → signed webhook → atomic purchase/access records → /studio.
Videos remain on-device. The browser access gate and export recheck prevent ordinary unpaid use, but browser code cannot be made copy-proof. Server authorization protects records and checkout, not the downloadable video algorithm.

Supabase public tables: purchase_orders, access_grants, payment_webhook_events. RLS enabled throughout. Customers may only read their own purchases/access. Clients cannot write grants or call the service-only payment RPC. Webhook ledger is intentionally inaccessible to client roles. The informational no-policy advisory for that table is intentional deny-all.

## Google setup (owner action)
1. Create/select a Google Cloud project and configure Google Auth Platform branding/audience.
2. Request only openid, email, profile. No Gmail API permission.
3. Create a Web OAuth client with origin https://www.splitvideo.in.
4. Authorized redirect URI: https://krziujxtmcjypezljniu.supabase.co/auth/v1/callback
5. Enter the client ID/secret directly in Supabase Authentication → Google provider. Never commit or paste secrets in chat.
6. Already saved: Supabase Site URL https://www.splitvideo.in and production redirect https://www.splitvideo.in/account. Configure additional exact preview URLs as needed. Set Supabase Site URL https://www.splitvideo.in and explicit /account redirect URLs for production and the verified preview URL. Add http://localhost:8080/account only for local testing. Do not use a wildcard for all vercel.app deployments.
7. Publish the Google audience for customers; a testing-only consent screen is not ready for ads.

## Dodo setup (owner action)
Complete merchant onboarding/approval. Create a one-time SplitVideo product in TEST mode first. Set its amount in Dodo; the browser never sends an amount or product ID.
In Supabase Edge Function Secrets set:
- DODO_PAYMENTS_API_KEY (test API key)
- DODO_PRODUCT_ID (test product)
- DODO_WEBHOOK_SECRET (test endpoint signing secret)
- DODO_PAYMENTS_ENVIRONMENT=test_mode
- CHECKOUT_ALLOWED_ORIGINS (comma-separated exact preview origins if different from documented branch alias)
Webhook URL: https://krziujxtmcjypezljniu.supabase.co/functions/v1/dodo-webhook
Subscribe: payment.succeeded, refund.succeeded, dispute.opened, dispute.accepted, dispute.lost, dispute.expired.
The function verifies raw-body Standard Webhooks signatures, retrieves the payment from Dodo, checks its server-created order/product/environment, and records event + grant in one database transaction. Failed requests return non-2xx for retry. Irrelevant products/events are acknowledged without access.
Refunds (including partial refunds) and disputes revoke that order's grant. Delayed success events cannot re-enable it. Dispute resolution requires owner review; it is not automatically restored. Another valid paid order still grants access.

## Vercel configuration
Branch-scoped Preview vars: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_BILLING_ENVIRONMENT=test_mode.
Only publishable keys belong in VITE_. Payment secrets and Supabase service credentials stay in Edge Functions.
Production must use VITE_BILLING_ENVIRONMENT=live_mode (also the code default). Never enable test-mode grants in production. Use a separate Supabase project/branch for ongoing test billing before the first live sale so changing Edge Function secrets cannot affect live payments.

## Launch blockers
- Google credentials and successful real login test.
- Dodo merchant approval, test credentials/product/webhook and successful test purchase/refund.
- Final price, scope of one-time access, future-update entitlement and refund policy.
- Real demo video supplied/recorded. Existing walkthrough and screenshots are available; no video has been fabricated.
- Revise privacy/terms for the final operation (AdSense is removed from the paid preview). Meta tracking is NOT installed and no advertising consent is assumed.
- Confirm supported mobile/desktop export behavior, especially Instagram's in-app browser.
- Publish live credentials, switch production env, verify real purchase/access/refund and only then run ads.

## Verification
Build: npm run build (generates route tree); typecheck: npm run typecheck.
Database test: supabase/tests/paid-access.sql is transaction-scoped and rolls back every fixture.
Edge functions fail closed without credentials. Neither a return URL nor a client flag grants access.
