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
import { UpdateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { SessionUser } from "@/lib/types";

type UpdateUser = z.infer<typeof UpdateUserSchema>;

export default function UpdateUserForm({ user }: { user: SessionUser }) {
  // console.log(user);
  // 1. Define your form.
  const form = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      image: user?.image || "",
      name: user?.name || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  // 2. Define a submit handler.
  async function onSubmit(values: UpdateUser) {
    // console.log(values);
    const { image, name } = values;
    await authClient.updateUser(
      {
        image,
        name,
      },
      {
        onSuccess: () => {
          toast.success("User Profile Updated!");
          // alert("success");
        },
        onError: (ctx) => {
          toast.error("Something Went Wrong!");
          // alert("failed");
        },
      }
    );
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Update Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Image URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will show in your Profile Avatar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isSubmitting ? (
                <Button type="submit">Save</Button>
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
