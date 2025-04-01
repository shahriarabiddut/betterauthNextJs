import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  MONGODB_URL,
} from "@/lib/constants/env";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { sendEmail } from "@/lib/mail/mailer";

const client = new MongoClient(MONGODB_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true, // Mark this true to use email & password verification
    // autoSignIn: false, // Mark this true for auto sign-in after sign-up
    // requireEmailVerification: false, // Mark this true to restrict unverified users this will reduce spam (recommended => true)
    sendResetPassword: async ({
      user,
      url,
      token,
    }: {
      user: { email: string };
      url: string;
      token: string;
    }) => {
      const resetUrl = `${url}?token=${token}`;

      await sendEmail("reset-password", {
        email: user.email,
        subject: "Reset Your Password",
        html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Password Reset Request</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
      });
    },
  },

  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
