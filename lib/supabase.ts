import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "budget-app-session",
    storage: {
      getItem: (key) => {
        if (typeof window !== "undefined") {
          const item = window.localStorage.getItem(key);
          console.log("Storage getItem:", { key, item });
          return item;
        }
        return null;
      },
      setItem: (key, value) => {
        if (typeof window !== "undefined") {
          console.log("Storage setItem:", { key, value });
          window.localStorage.setItem(key, value);
        }
      },
      removeItem: (key) => {
        if (typeof window !== "undefined") {
          console.log("Storage removeItem:", key);
          window.localStorage.removeItem(key);
        }
      },
    },
  },
});
