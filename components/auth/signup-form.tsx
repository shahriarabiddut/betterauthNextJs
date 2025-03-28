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
import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type SignUp = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: SignUp) => {
    setError("");
    setSuccess("");
    {
      // console.log(values);
      try {
        const response = await fetch(`/api/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        // console.log(response);
        // response.status === 201 && router.push("/");
        const data = await response.json();
        response.status === 201 && setSuccess(data.success);
        response.status !== 201 && setError(data.error);
      } catch (e) {
        setError(`Something Went Wrong!`);
        console.error(e);
      }
    }
  };
  return (
    <CardWrapper
      cardTitle="BetterAuth"
      headerLabel="Create An Account"
      backButtonLabel="Already Have an account?&nbsp;"
      backButtonLinkLabel={" Login!"}
      backButtonHref="/sign-in"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type="name"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <Button disabled={isSubmitting} type="submit" className="w-full ">
                Create An Account
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
  );
}
