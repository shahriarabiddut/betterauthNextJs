"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AccountDeleteEmail() {
  // Uncomment sendDeleteAccountVerification in auth.ts
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Delete Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={"destructive"}
            className="flex items-center justify-center gap-2"
            disabled={isDeleting}
            onClick={async () => {
              await authClient.deleteUser(
                {
                  callbackURL: "/goodbye",
                },
                {
                  onRequest: () => {
                    setIsDeleting(true);
                  },
                  onResponse: () => {
                    setIsDeleting(false);
                  },
                  onSuccess: () => {
                    toast.success("Check Email And Confirm Account Delete!");
                  },
                  onError: (ctx) => {
                    toast.error("Something Went Wrong!");
                  },
                }
              );
            }}
          >
            {" "}
            {!isDeleting ? (
              <FaTrash />
            ) : (
              <Loader2 className="animate-spin" />
            )}{" "}
            Delete My Account
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
