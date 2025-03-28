import SignUpForm from "@/components/auth/signup-form";
import React from "react";

export default function Register() {
  return (
    <section className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-800 via-sky-500  to-blue-800">
      <SignUpForm />
    </section>
  );
}
