"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmailSchema } from "@/schemas";
import { Loader2 } from "lucide-react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";

type Email = z.infer<typeof EmailSchema>;

const ForgetPassword = ({
  isForget,
  setIsForget,
}: {
  isForget: boolean;
  setIsForget: Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<Email>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: Email) => {
    setError("");
    setSuccess("");
    const { email } = values;
    await authClient.forgetPassword(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: async (context) => {
          setSuccess(
            "Reset Password Email Sent! If not found, Check Spams Also..."
          );
        },
        onError: async (context) => {
          setError(context.error.message);
        },
      }
    );
  };
  return (
    <Dialog open={isForget} onOpenChange={() => setIsForget(false)}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forget Password ?</DialogTitle>
          <DialogDescription>
            Enter your email to recieve a password reset email.
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          type="email"
                          placeholder="example@email.com"
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
                    Send Email
                  </Button>
                ) : (
                  <>
                    <Loader2 className="animate-spin h-6 w-6  mx-auto" />
                  </>
                )}
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPassword;
