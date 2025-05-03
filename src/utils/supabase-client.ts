"use client";

import { Database } from "@/types/generated/database.types";
import { createClient } from "@supabase/supabase-js";

const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const supabase = () => client;

export const useSupabaseClient = supabase;
