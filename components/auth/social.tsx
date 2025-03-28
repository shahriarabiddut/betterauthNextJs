"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Social() {
  return (
    <>
      <form
        action={() => {
          alert("test");
        }}
        className="grid grid-cols-2 w-full gap-2"
      >
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          type="submit"
          name="action"
          value={"google"}
        >
          <FcGoogle />
        </Button>
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          type="submit"
          name="action"
          value={"github"}
        >
          <FaGithub className="" />
        </Button>
      </form>
    </>
  );
}
