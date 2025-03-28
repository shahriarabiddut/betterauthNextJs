import LoginForm from "@/components/auth/signin-form";
import React from "react";

const Login = () => {
  return (
    <section className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-800 via-sky-500  to-blue-800">
      <LoginForm />
    </section>
  );
};

export default Login;
