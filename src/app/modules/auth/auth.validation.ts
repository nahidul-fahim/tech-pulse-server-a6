import { z } from "zod";

// sign in validation schema
const signInValidationSchema = z.object({
    body: z.object({
        email: z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required!"
        })
            .email(),
        password: z.string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required!"
        })
    })
})

// forgot password validation schema
const forgotPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required!"
        })
            .email(),
    })
})

// reset password validation schema
const resetPasswordValidationSchema = z.object({
    body: z.object({
        token: z.string({
            invalid_type_error: "Token must be string",
            required_error: "Token is required!"
        }),
        password: z.string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required!"
        }),
    })
})


export const AuthValidation = { signInValidationSchema, forgotPasswordValidationSchema, resetPasswordValidationSchema };