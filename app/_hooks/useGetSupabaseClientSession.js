import { createClient } from "@/app/_lib/supabase/client";
import { useEffect, useState } from "react";

export function useGetSupabaseClientSession() {
  const [session, setSession] = useState({});

  useEffect(() => {
    async function getSession() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setSession(user);
    }

    getSession();
  }, []);

  return session;
}
