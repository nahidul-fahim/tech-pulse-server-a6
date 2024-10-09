import { z } from "zod";


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

const forgotPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required!"
        })
            .email(),
    })
})

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