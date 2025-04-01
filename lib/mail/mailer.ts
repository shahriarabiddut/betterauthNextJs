import nodemailer from "nodemailer";
import {
  MAIL_PASS,
  MAIL_USER,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SITE_NAME,
} from "@/lib/constants/env";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  secure: SMTP_SECURE === "true",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

type EmailType = "reset-password" | "verify-email" | "welcome" | "custom";

interface EmailOptions {
  email: string;
  url?: string;
  subject?: string;
  html?: string;
}

export async function sendEmail(type: EmailType, options: EmailOptions) {
  let subject = "";
  let html = "";

  switch (type) {
    case "reset-password":
      subject = options.subject || "Reset Your Password";
      html =
        options.html ||
        `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${options.url}" 
             style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `;
      break;

    case "verify-email":
      subject = "Verify Your Email";
      html = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Verify Your Email</h2>
          <p>Click the button below to verify your email address:</p>
          <a href="${options.url}" 
             style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </div>
      `;
      break;

    case "welcome":
      subject = `Welcome to ${SITE_NAME}`;
      html = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Welcome to ${SITE_NAME}!</h2>
          <p>We're excited to have you on board.</p>
          <p>Enjoy exploring our platform.</p>
        </div>
      `;
      break;

    case "custom":
      if (!options.subject || !options.html) {
        throw new Error("Custom emails require both subject and HTML content.");
      }
      subject = options.subject;
      html = options.html;
      break;

    default:
      throw new Error("Invalid email type.");
  }

  const mailOptions = {
    from: `${SITE_NAME} <betterauth@shahriarabiddut.com>`,
    to: options.email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}
