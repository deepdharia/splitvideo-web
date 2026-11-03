-- Payment writes are service-only. Customers can read only their own records.
create table public.purchase_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  product_key text not null default 'splitvideo' check (product_key = 'splitvideo'),
  dodo_product_id text not null,
  environment text not null check (environment in ('test_mode', 'live_mode')),
  status text not null default 'pending' check (status in ('pending','paid','refunded','disputed')),
  payment_id text unique,
  checkout_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index purchase_orders_user_created_idx on public.purchase_orders(user_id, created_at desc);
create table public.access_grants (
  order_id uuid primary key references public.purchase_orders(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  product_key text not null check (product_key = 'splitvideo'),
  environment text not null check (environment in ('test_mode', 'live_mode')),
  active boolean not null default false,
  updated_at timestamptz not null default now()
);
create index access_grants_user_product_idx on public.access_grants(user_id, product_key, environment) where active;
create table public.payment_webhook_events (
  event_id text primary key,
  event_type text not null,
  order_id uuid not null references public.purchase_orders(id),
  processed_at timestamptz not null default now()
);
create index payment_webhook_events_order_idx on public.payment_webhook_events(order_id);
alter table public.purchase_orders enable row level security;
alter table public.access_grants enable row level security;
alter table public.payment_webhook_events enable row level security;
revoke all on public.purchase_orders, public.access_grants, public.payment_webhook_events from anon, authenticated;
grant select (id,user_id,product_key,environment,status,created_at,updated_at) on public.purchase_orders to authenticated;
grant select on public.access_grants to authenticated;
grant all on public.purchase_orders, public.access_grants, public.payment_webhook_events to service_role;
create policy "Customers read own purchases" on public.purchase_orders for select to authenticated using ((select auth.uid()) = user_id);
create policy "Customers read own access" on public.access_grants for select to authenticated using ((select auth.uid()) = user_id);

-- SECURITY INVOKER: only service_role can call or modify payment records.
-- Lock order before recording an event; repeat events are acknowledged atomically.
create function public.record_verified_payment(
  p_event_id text, p_event_type text, p_order_id uuid,
  p_payment_id text, p_product_id text, p_environment text, p_status text
) returns void language plpgsql security invoker set search_path = '' as $$
declare o public.purchase_orders; prior_event public.payment_webhook_events;
begin
  if p_status not in ('paid','refunded','disputed') then raise exception 'Invalid payment state'; end if;
  select * into o from public.purchase_orders where id = p_order_id for update;
  if not found or o.dodo_product_id <> p_product_id or o.environment <> p_environment then
    raise exception 'Payment does not match order';
  end if;
  if o.payment_id is not null and o.payment_id <> p_payment_id then raise exception 'Order already linked'; end if;
  select * into prior_event from public.payment_webhook_events where event_id = p_event_id;
  if found then
    if prior_event.order_id <> p_order_id then raise exception 'Event belongs to another order'; end if;
    return;
  end if;
  insert into public.payment_webhook_events(event_id,event_type,order_id) values (p_event_id,p_event_type,p_order_id);
  -- A delayed success event must never undo a refund/dispute.
  update public.purchase_orders set
    payment_id = p_payment_id,
    status = case when status in ('refunded','disputed') then status else p_status end,
    updated_at = now()
    where id = o.id;
  insert into public.access_grants(order_id,user_id,product_key,environment,active)
    select id,user_id,product_key,environment,status = 'paid' from public.purchase_orders where id = o.id
    on conflict (order_id) do update set active = excluded.active, updated_at = now();
end;
$$;
revoke all on function public.record_verified_payment(text,text,uuid,text,text,text,text) from public, anon, authenticated;
grant execute on function public.record_verified_payment(text,text,uuid,text,text,text,text) to service_role;
