"use client"; // Add this directive at the top
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/"); // Redirect after sign out
  };

  return (
    <div>
      Dashboard
      <Button variant="outline" className="w-full" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
