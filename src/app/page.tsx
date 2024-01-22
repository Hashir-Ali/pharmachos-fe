"use client";
import { redirect } from 'next/navigation';

import useIsAuthenticated from '@/hooks/useIsAuthenticated';

export default function Home() {
  const { isAuthenticated } = useIsAuthenticated();
  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
