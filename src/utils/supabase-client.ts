import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/generated/database.types";

export function createSupabaseClient(token: string | null) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    },
  );
}
