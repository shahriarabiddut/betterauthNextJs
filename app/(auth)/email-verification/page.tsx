import SendVerificationEmail from "@/components/auth/send-verify-email";

export default async function EmailVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const email = (await searchParams)?.email || "";

  return (
    <>
      <SendVerificationEmail email={email} />
    </>
  );
}
