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
import { SignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ForgetPassword from "./forget-password";

type SignIn = z.infer<typeof SignInSchema>;

export default function SignInForm() {
  const [error, setError] = useState<string | undefined>("");
  const [isForget, setIsForget] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: SignIn) => {
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
    <>
      <CardWrapper
        cardTitle="Auth"
        headerLabel="Welcome Back"
        backButtonLabel="Don't Have an account?&nbsp;"
        backButtonLinkLabel={" Create A New Account!"}
        backButtonHref="/sign-up"
        showSocial
      >
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
                    <div className="flex items-center justify-end w-full h-fit">
                      <Button
                        variant={"linkBlue"}
                        disabled={isSubmitting}
                        onClick={() => setIsForget(true)}
                        type="button"
                      >
                        Forget Password
                      </Button>
                    </div>
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
                  Sign In
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
      <ForgetPassword isForget={isForget} setIsForget={setIsForget} />
    </>
  );
}
