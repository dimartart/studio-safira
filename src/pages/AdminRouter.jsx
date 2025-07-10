import React, { useState, useEffect } from 'react'
import AdminLogin from "../components/AdminLogin";
import AdminPanel from "../components/AdminPanel";
import { supabase } from "../supabaseClient";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return session ? <AdminPanel supabase={supabase} /> : <AdminLogin supabase={supabase} />;
}
