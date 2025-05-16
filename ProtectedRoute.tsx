"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./app/context/AuthContext";
import Navbar from "./app/components/Navbar";

export default function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  const protectedRoutes = ["/user"]; // Add all protected routes here
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    if (!isLoading && isProtected && !isAuthenticated) {
      router.push("/login"); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, isLoading, isProtected, router]);

  if (isProtected && !isAuthenticated) {
    return null; // Or return a different component if you prefer
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
