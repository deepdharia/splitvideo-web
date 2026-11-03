begin;
insert into auth.users(id) values ('10000000-0000-0000-0000-000000000001'),('10000000-0000-0000-0000-000000000002');
set local role service_role;
insert into public.purchase_orders(id,user_id,dodo_product_id,environment) values
('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','test_product','test_mode'),
('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','test_product','test_mode');
select public.record_verified_payment('test_success','payment.succeeded','20000000-0000-0000-0000-000000000001','test_payment','test_product','test_mode','paid');
select public.record_verified_payment('test_success','payment.succeeded','20000000-0000-0000-0000-000000000001','test_payment','test_product','test_mode','paid');
do $$ begin
  if (select count(*) from public.payment_webhook_events where event_id='test_success') <> 1 then raise exception 'Duplicate event'; end if;
  if not (select active from public.access_grants where order_id='20000000-0000-0000-0000-000000000001') then raise exception 'Missing access'; end if;
  begin
    perform public.record_verified_payment('bad_product','payment.succeeded','20000000-0000-0000-0000-000000000002','test_other','wrong_product','test_mode','paid');
    raise exception 'Bad product accepted';
  exception when raise_exception then
    if sqlerrm <> 'Payment does not match order' then raise; end if;
  end;
end $$;
select public.record_verified_payment('test_refund','refund.succeeded','20000000-0000-0000-0000-000000000001','test_payment','test_product','test_mode','refunded');
select public.record_verified_payment('late_success','payment.succeeded','20000000-0000-0000-0000-000000000001','test_payment','test_product','test_mode','paid');
-- Refund before payment success is equally terminal.
select public.record_verified_payment('early_refund','refund.succeeded','20000000-0000-0000-0000-000000000002','test_payment_2','test_product','test_mode','refunded');
select public.record_verified_payment('late_success_2','payment.succeeded','20000000-0000-0000-0000-000000000002','test_payment_2','test_product','test_mode','paid');
do $$ begin
  if exists(select 1 from public.access_grants where active) then raise exception 'Refund re-enabled'; end if;
end $$;
reset role;
select set_config('request.jwt.claim.sub','10000000-0000-0000-0000-000000000001',true);
set local role authenticated;
do $$ begin
  if (select count(*) from public.access_grants) <> 1 then raise exception 'RLS isolation failed'; end if;
  if has_table_privilege('authenticated','public.access_grants','INSERT') or has_table_privilege('authenticated','public.access_grants','UPDATE') then raise exception 'Customer can grant access'; end if;
  if has_function_privilege('authenticated','public.record_verified_payment(text,text,uuid,text,text,text,text)','EXECUTE') then raise exception 'Customer can process payments'; end if;
  if has_table_privilege('anon','public.access_grants','SELECT') then raise exception 'Anonymous access'; end if;
end $$;
reset role;
rollback;
select 'PASS: purchase, idempotency, product matching, out-of-order refunds, RLS isolation and privilege boundaries' as result;
