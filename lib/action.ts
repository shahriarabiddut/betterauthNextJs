"use server";
// import { auth } from "@/lib/better-auth/auth";
// import { headers } from "next/headers";

//export const getServerSession = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   return session;
// };

import { NextRequest } from "next/server";
import { auth } from "@/lib/better-auth/auth";
import { Headers } from "next/dist/compiled/@edge-runtime/primitives";

export const getServerSession = async (request: NextRequest) => {
  // Create a new Headers object
  const authHeaders = new Headers();

  // Add the cookie header if it exists
  const cookie = request.headers.get("cookie");
  if (cookie) {
    authHeaders.set("cookie", cookie);
  }

  const session = await auth.api.getSession({
    headers: authHeaders, // Pass the Headers instance
  });

  return session;
};
