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
import { UpdateUserEmailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type UpdateEmail = z.infer<typeof UpdateUserEmailSchema>;

export default function UpdateEmailForm({ user }: { user: SessionUser }) {
  // console.log(user);
  // 1. Define your form.
  const form = useForm<UpdateEmail>({
    resolver: zodResolver(UpdateUserEmailSchema),
    defaultValues: {
      newEmail: "",
      callbackURL: "/dashboard",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  // 2. Define a submit handler.
  async function onSubmit(values: UpdateEmail) {
    // console.log(values);
    await authClient.changeEmail(values, {
      onSuccess: () => {
        toast.success("Check , Confirmation Email is Sent!");
        // alert("success");
      },
      onError: (ctx) => {
        toast.error("Something Went Wrong!");
        // alert("failed");
      },
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Change User Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isSubmitting}
                        placeholder="email@gmail.com"
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
                <Button type="submit">Change Email</Button>
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
