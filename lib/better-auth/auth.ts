import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  MONGODB_URL,
} from "@/lib/constants/env";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const client = new MongoClient(MONGODB_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true, // Mark this true to use email & password verification
    autoSignIn: false, // Mark this true for auto sign-in after sign-up
    requireEmailVerification: false, // Mark this true to restrict unverified users this will reduce spam (recommended => true)
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
