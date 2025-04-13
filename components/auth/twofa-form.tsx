"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { OTPSchema } from "@/schemas";
import { authClient } from "@/lib/auth-client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import CardWrapper from "@/components/auth/card-wrapper";
import { SITE_NAME } from "@/lib/constants/env";
import { useEffect, useState } from "react";

type VerifyOTP = z.infer<typeof OTPSchema>;

export default function TwoFAForm() {
  const router = useRouter();

  const form = useForm<VerifyOTP>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: VerifyOTP) {
    await authClient.twoFactor.verifyOtp(
      { code: values.otp },
      {
        onSuccess() {
          toast.success("OTP Verified Successfully!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 300);
        },
        onError(ctx) {
          toast.error("Invalid or Expired OTP!");
          toast.error(ctx.error.message);
        },
      }
    );
  }

  //   Resending OTP
  const [cooldown, setCooldown] = useState(0); // cooldown in seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);
  const handleResend = async () => {
    const { data, error } = await authClient.twoFactor.sendOtp();
    if (data) {
      toast.success("OTP has been sent. Please check your email.");
      setCooldown(60); // 60 seconds cooldown
    } else if (error) {
      toast.error(error.message || "Failed to send OTP.");
    }
  };
  return (
    <CardWrapper
      cardTitle={SITE_NAME}
      headerLabel="Enter OTP to Verify Yourself"
      backButtonLabel="hide"
      backButtonLinkLabel="Go Back"
      backButtonHref="/sign-in"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  {/* <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    className="w-full flex justify-between gap-2"
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} className="w-full" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP> */}
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    className="w-full flex justify-between items-center gap-3"
                  >
                    <InputOTPGroup className="flex gap-2 flex-1">
                      <InputOTPSlot index={0} className="w-full" />
                      <InputOTPSlot index={1} className="w-full" />
                    </InputOTPGroup>

                    <InputOTPSeparator className="text-muted-foreground" />

                    <InputOTPGroup className="flex gap-2 flex-1">
                      <InputOTPSlot index={2} className="w-full" />
                      <InputOTPSlot index={3} className="w-full" />
                    </InputOTPGroup>

                    <InputOTPSeparator className="text-muted-foreground" />

                    <InputOTPGroup className="flex gap-2 flex-1">
                      <InputOTPSlot index={4} className="w-full" />
                      <InputOTPSlot index={5} className="w-full" />
                    </InputOTPGroup>
                  </InputOTP>

                  <FormMessage />
                  <div className="flex items-center justify-end w-full h-fit">
                    <Button
                      variant="linkBlue"
                      disabled={isSubmitting || cooldown > 0}
                      onClick={handleResend}
                      type="button"
                    >
                      {cooldown > 0
                        ? `Request again in ${cooldown}s`
                        : "Request Another OTP"}
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormError message={""} />
          <FormSuccess message={""} />

          <div>
            {!isSubmitting ? (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Verify
              </Button>
            ) : (
              <Loader2 className="animate-spin h-6 w-6 mx-auto" />
            )}
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
