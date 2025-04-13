import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGODB_URL,
  SITE_NAME,
} from "@/lib/constants/env";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { sendEmail } from "@/lib/mail/mailer";
import { twoFactor } from "better-auth/plugins";

const client = new MongoClient(MONGODB_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true, // Mark this true to use email & password verification
    autoSignIn: false, // Mark this true for auto sign-in after sign-up
    requireEmailVerification: true, // Mark this true to restrict unverified users this will reduce spam (recommended => true)
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
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail("verify-email", {
        email: user.email,
        url: url,
      });
    },
  },
  // Change User Email Process
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url, token },
        request
      ) => {
        await sendEmail("custom", {
          email: user.email,
          subject: "Approve Email Change",
          html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                  <h2>Approve Email Change Request</h2>
                  <p>Click the button below to confirm:</p>
                  <a href="${url}" 
                    style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    I Confirm To Change My Email
                  </a>
                  <p>If you did not request this, please ignore this email.</p>
                </div>
              `,
        });
      },
    },
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        // Perform any cleanup or additional checks here
      },
      sendDeleteAccountVerification: async (
        {
          user, // The user object
          url, // The auto-generated URL for deletion
          token, // The verification token  (can be used to generate custom URL)
        },
        request // The original request object (optional)
      ) => {
        // Your email sending logic here
        await sendEmail("custom", {
          email: user.email,
          subject: "Confirm Your Account Deletion ?",
          html: `
                      <div style="font-family: Arial, sans-serif; text-align: center;">
                        <h2>Confirm Your Account Deletion Request</h2>
                        <p>Click the button below to confirm:</p>
                        <a href="${url}"
                          style="display: inline-block; padding: 7px 14px; margin: 20px 0; color: #fff; background-color: #ff0500; text-decoration: none; border-radius: 5px;font-size:16px;">
                          I Confirm My Account Deletion
                        </a>
                        <p>If you did not request this, please ignore this email.</p>
                      </div>
                    `,
        });
      },
    },
  },

  socialProviders: {
    // github: {
    //   clientId: GITHUB_CLIENT_ID,
    //   clientSecret: GITHUB_CLIENT_SECRET,
    // },
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  appName: SITE_NAME, // provide your app name. It'll be used as an issuer.
  plugins: [
    nextCookies(),
    twoFactor({
      skipVerificationOnEnable: true,
      otpOptions: {
        async sendOTP({ user, otp }, request) {
          // send otp to user via email
          await sendEmail("custom", {
            email: user.email,
            subject: `Your OTP to Login in ${SITE_NAME}`,
            html: `
                    <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                      <h2>Your One-Time Password (OTP)</h2>
                      <p>Use the code below to complete your login process:</p>
                      <div style="font-size: 24px; font-weight: bold; margin: 20px 0; background-color: #f0f0f0; padding: 15px; display: inline-block; border-radius: 8px;">
                        ${otp}
                      </div>
                      <p>This code will expire soon and can only be used once.</p>
                      <p>If you did not attempt to log in, please ignore this email or contact support immediately.</p>
                      <p style="margin-top: 30px; font-size: 12px; color: #777;">Thank you, <br>${SITE_NAME}</p>
                    </div>
                  `,
          });
        },
      },
    }),
  ], // make sure this is the last plugin in the array
});
