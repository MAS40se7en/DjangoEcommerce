import { z } from "zod";

export const registerSchema = z.object({
    email: z
        .string()
        .email({
            message: "Email is invalid"
        })
        .nonempty({
            message: "Email is required"
        }),
    username: z
        .string()
        .min(3, { message: "username must be more than 3 characters" })
        .max(50, { message: "username is at maximum 10 characters" })
        .nonempty({
            message: "Username is required"
        }),
    password: z
        .string()
        .min(8, { message: "Password must be more than 8 characters" })
        .nonempty({
            message: "Password is required"
        })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")  // At least one uppercase letter
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")  // At least one lowercase letter
        .regex(/[0-9]/, "Password must contain at least one number")           // At least one number
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z
        .string()
        .min(8, {
            message: "Passwords must match"
        })
        .nonempty({
            message: "Please confirm your password"
        })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match!",
        path: ["confirmPassword"]
    })

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .nonempty("Password is required"),
});

export const passwordResetSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
});