"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import * as z from "zod";

type PasswordUpdate = z.infer<typeof PasswordSchema>;
export default function AccountDeletePassword() {
  // Comment sendDeleteAccountVerification in auth.ts
  // 1. Define your form.
  const form = useForm<PasswordUpdate>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  // 2. Define a submit handler.
  async function onSubmit(values: PasswordUpdate) {
    // console.log(values);
    await authClient.deleteUser(values, {
      onSuccess: () => {
        toast.success("Account Deleted!");
      },
      onError: (ctx) => {
        toast.error("Something Went Wrong!");
      },
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Delete Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isSubmitting}
                        placeholder="Enter Your Password To Delete"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is you used to Login.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"destructive"}
                className="flex items-center justify-center gap-2"
                disabled={isSubmitting}
                type="submit"
              >
                {!isSubmitting ? (
                  <FaTrash />
                ) : (
                  <Loader2 className="animate-spin" />
                )}{" "}
                Delete My Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
