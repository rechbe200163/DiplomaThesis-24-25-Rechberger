import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
dotenv.config();

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
);
