import { z } from "zod";


const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required"
        }),
        email: z.string({
            invalid_type_error: "Email must be a string",
            required_error: "Email is required"
        }).email(),
        role: z.enum(["user", "admin"]),
        password: z.string({
            invalid_type_error: "Password must be a string",
            required_error: "Password is required"
        }).min(6, { message: "Must be 6 or more characters long" }),
        phone: z.string({
            invalid_type_error: "Phone must be a string",
            required_error: "Phone is required"
        }),
        address: z.string({
            invalid_type_error: "Address must be a string",
            required_error: "Address is required"
        }),
        preferences: z.string({
            invalid_type_error: "Preferences must be a string",
        }).optional()
    })
});


// update user validation schema
const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string"
        }).optional(),
        email: z.string({
            invalid_type_error: "Email must be a string"
        }).email().optional(),
        phone: z.string({
            invalid_type_error: "Phone must be a string"
        }).optional(),
        address: z.string({
            invalid_type_error: "Address must be a string"
        }).optional(),
        preferences: z.string({
            invalid_type_error: "Preferences must be a string",
        }).optional(),
    })
});

// update user status validation schema
const updateUserStatusValidationSchema = z.object({
    body: z.object({
        isActive: z.boolean({
            invalid_type_error: "Status must be a boolean"
        }).optional(),
        role: z.enum(["user", "admin"]).optional()
    })
});



export const UserValidation = { createUserValidationSchema, updateUserValidationSchema, updateUserStatusValidationSchema }