CREATE TABLE IF NOT EXISTS public.donations (
  id serial PRIMARY KEY,
  donor_name varchar(200) NOT NULL,
  email varchar(300) NOT NULL,
  phone varchar(40),
  country varchar(100),
  city varchar(100),
  sender_account_number varchar(100),
  amount integer NOT NULL,
  currency varchar(3) NOT NULL DEFAULT 'PKR',
  purpose varchar(160),
  frequency varchar(20) NOT NULL DEFAULT 'once',
  payment_method varchar(40) NOT NULL DEFAULT 'bank_transfer',
  bank_account_label varchar(220),
  transaction_ref varchar(160),
  receipt_url varchar(500),
  status varchar(24) NOT NULL DEFAULT 'pending',
  message text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS country varchar(100),
  ADD COLUMN IF NOT EXISTS city varchar(100),
  ADD COLUMN IF NOT EXISTS sender_account_number varchar(100);

ALTER TABLE public.uploaded_media
  ADD COLUMN IF NOT EXISTS storage_path varchar(1000),
  ADD COLUMN IF NOT EXISTS data_base64 text;

ALTER TABLE public.uploaded_media
  ALTER COLUMN data_base64 DROP NOT NULL;
