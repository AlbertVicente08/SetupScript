create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  is_pro boolean default false,
  stripe_customer_id text,
  stripe_payment_id text,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table public.users enable row level security;

create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);
