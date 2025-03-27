import { LoginButton } from "@/components/auth/login-button";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-800 via-sky-500  to-blue-800">
      <div className="space-y-6 flex flex-col  justify-center items-center">
        <TypographyH1>Sign In</TypographyH1>
        <p className="text-white text-lg ">
          Better Authentication service with Better Auth!
        </p>
        <div>
          <LoginButton mode={"redirect"}>
            <Button variant={"secondary"} size={"lg"}>
              Sign In{" "}
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
