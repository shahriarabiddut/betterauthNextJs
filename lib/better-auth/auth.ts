import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/lib/constants/env";
// import { client } from "@/db"; // your mongodb client

export const auth = betterAuth({
  // database: mongodbAdapter(client)
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
});
