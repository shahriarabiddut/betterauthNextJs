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
import { SessionUser } from "@/lib/types";
import { UpdateUserPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type UpdatePassword = z.infer<typeof UpdateUserPasswordSchema>;

export default function UpdatePasswordForm({ user }: { user: SessionUser }) {
  // console.log(user);
  // 1. Define your form.
  const form = useForm<UpdatePassword>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      newPassword: "",
      currentPassword: "",
      revokeOtherSessions: true,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  // 2. Define a submit handler.
  async function onSubmit(values: UpdatePassword) {
    // console.log(values);
    await authClient.changePassword(values, {
      onSuccess: () => {
        toast.success("Password Changed , Successfully!");
        // alert("success");
      },
      onError: (ctx) => {
        toast.error("Something Went Wrong!");
        console.error(ctx);
        // alert("failed");
      },
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Change User Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isSubmitting}
                        placeholder="Enter Your New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is you used to login.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isSubmitting}
                        placeholder="Enter Your Current Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is you used to login.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isSubmitting ? (
                <Button type="submit">Change Password</Button>
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </form>
          </Form>{" "}
        </CardContent>
      </Card>
    </>
  );
}
