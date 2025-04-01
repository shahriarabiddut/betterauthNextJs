import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export const ResetPassSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Minimum 6 Characters Required!",
    })
    .max(30, {
      message: "Maximum 30 Characters!",
    }),
});

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Email Is Required!",
  }),
  password: z
    .string()
    .min(6, {
      message: "Minimum 6 Characters Required!",
    })
    .max(30, {
      message: "Maximum 30 Characters!",
    }),
  name: z
    .string()
    .min(1, {
      message: "Name is Required!",
    })
    .max(30, {
      message: "Name must be at most 30 characters!",
    }),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required").max(30, {
    message: "Name must be at most 30 characters!",
  }),
  email: z
    .string()
    .min(6, "Email must be at least 6 characters")
    .email("Please enter a valid email")
    .toLowerCase(),
  password: z.string().min(6, "Password is required").max(30, {
    message: "Maximum 30 Characters!",
  }),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .min(6, "Email must be at least 6 characters")
    .email("Please enter a valid email")
    .toLowerCase(),
});
