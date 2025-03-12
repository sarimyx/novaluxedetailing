import { Database } from "@/types/generated/database.types";
import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
