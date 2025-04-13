"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaTrash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProviderDetails({
  provider,
}: {
  provider: string | null;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">OAuth Provider</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="uppercase inline-flex justify-center items-center gap-1">
            {" "}
            {provider == "google" && <FaGoogle />} {provider}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
