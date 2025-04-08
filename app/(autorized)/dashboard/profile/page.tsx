import ProfileData from "@/components/profile/ProfileData";
import { getServerSession } from "@/lib/action";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-n");
  }
  return (
    <>
      <ProfileData session={session} />
    </>
  );
}
