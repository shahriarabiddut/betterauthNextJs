"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Social() {
  // OAuth Handling States
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  // OAuth Login - Google
  const handleGoogleProvider = async () => {
    try {
      setIsOAuthLoading(true);
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            setIsOAuthLoading(true);
          },
          onResponse: () => {
            setIsOAuthLoading(false);
          },
          onSuccess: async (context) => {
            toast.success("Google Provider Loading.....");
          },
          onError: async (context) => {
            console.error(context);
            if (context.error.status === 403) {
              // alert("Please verify your email address");
            }
            toast.error(context.error.message);
          },
        }
      );
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error(error);
      setIsOAuthLoading(false);
    }
  };

  return (
    <>
      <form
        action={() => {
          alert("test");
        }}
        className="grid grid-cols-2 w-full gap-2"
      >
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          type="submit"
          name="action"
          value={"google"}
          disabled={isOAuthLoading}
          onClick={handleGoogleProvider}
        >
          <FcGoogle />
        </Button>
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          type="submit"
          name="action"
          value={"github"}
          disabled={isOAuthLoading}
        >
          <FaGithub className="" />
        </Button>
      </form>
    </>
  );
}
