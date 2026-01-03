"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/authstore";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/login"); // or any page you want guests to go
    return null;
  }

  return <>{children}</>;
}
