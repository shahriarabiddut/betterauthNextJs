"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SITE_NAME } from "@/lib/constants/env";
import { ResetPassSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type ResetPass = z.infer<typeof ResetPassSchema>;

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [isForget, setIsForget] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<ResetPass>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const onSubmit = async (values: ResetPass) => {
    setError("");
    setSuccess("");
    const { password } = values;
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setError("Invalid token. Please try again.");
      return;
    }
    const { data, error } = await authClient.resetPassword(
      { newPassword: password, token },
      {
        onSuccess: async (context) => {
          setSuccess("Password Changed Successfully ! Redirecting...");
          setTimeout(() => {
            router.push("/sign-in");
          }, 1000);
        },
        onError: async (context) => {
          setError(context.error.message);
        },
      }
    );
  };
  return (
    <>
      <CardWrapper
        cardTitle={SITE_NAME}
        headerLabel="Enter New Password for your account"
        backButtonLabel="Already remebered Password!?&nbsp;"
        backButtonLinkLabel={"Login!"}
        backButtonHref="/sign-in"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="password"
                        placeholder="Enter Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />

            <div>
              {!isSubmitting ? (
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full "
                >
                  Reset
                </Button>
              ) : (
                <>
                  <Loader2 className="animate-spin h-6 w-6  mx-auto" />
                </>
              )}
            </div>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
