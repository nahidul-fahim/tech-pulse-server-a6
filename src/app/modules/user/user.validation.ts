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
        password: z.string({
            invalid_type_error: "Password must be a string",
            required_error: "Password is required"
        }).min(6, { message: "Must be 6 or more characters long" }),
        bio: z.string({
            invalid_type_error: "Bio must be a string"
        }).optional(),
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
        bio: z.string({
            invalid_type_error: "Bio must be a string"
        }).optional(),
    })
});

// block user validation schema
const manageUserValidationSchema = z.object({
    body: z.object({
        isBlocked: z.boolean({
            invalid_type_error: "IsBlocked must be a boolean"
        }).optional(),
        isDeleted: z.boolean({
            invalid_type_error: "IsDeleted must be a boolean"
        }).optional()
    })
});


// create admin validation schema
const createAdminValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required"
        }),
        email: z.string({
            invalid_type_error: "Email must be a string",
            required_error: "Email is required"
        }).email(),
        password: z.string({
            invalid_type_error: "Password must be a string",
            required_error: "Password is required"
        }).min(6, { message: "Must be 6 or more characters long" })
    })
});


export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
    manageUserValidationSchema,
    createAdminValidationSchema
}