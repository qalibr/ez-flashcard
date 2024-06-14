'use client'

import React, { FormEvent, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { logout } from "@/app/logout/actions";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      const {data, error} = await supabase.auth.getUser();
      if (data?.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }
      setLoading(false);
    };

    checkAuthenticationStatus();
  }, [router, supabase.auth]);

  if (loading) {
    return <div>Loading...</div>; // Loading. Can make this better looking later.
  }

  if (!isAuthenticated) {
    return null; // Nothing is returned while waiting for auth
  }

  // Must pass the form-event to the button.
  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    await logout(); // Server action
    router.push('/login');
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button onClick={() => router.push('/private')}>
          Dashboard
        </button>
        <form onSubmit={handleLogout}>
          <button type="submit">
            Logout
          </button>
        </form>
      </main>
  );
}