import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Authenticated client — use in components where the user is signed in
export function useSupabase() {
  const { getToken } = useAuth();

  return createClient(supabaseUrl, supabaseKey, {
    accessToken: () => getToken(),
  });
}

// Public client — lazy singleton to avoid crashing during static prerendering
let _supabase: SupabaseClient | null = null;
export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseKey);
  }
  return _supabase;
}
