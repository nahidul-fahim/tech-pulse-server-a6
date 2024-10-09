import { z } from "zod";

// create validation schema
const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required"
        }),
        description: z.string({
            invalid_type_error: "Description must be a string",
            required_error: "Description is required"
        }),
        color: z.string({
            invalid_type_error: "Color must be a string",
            required_error: "Color is required"
        }),
        isElectric: z.boolean({
            invalid_type_error: "isElectric must be a boolean",
            required_error: "isElectric is required",
        }),
        carType: z.string({
            invalid_type_error: "Car type must be a string",
            required_error: "Car type is required"
        }),
        features: z
            .array(z.string({
                invalid_type_error: "Features must be string"
            }))
            .nonempty({
                message: "Features are required and must contain at least one feature",
            }),
        pricePerHour: z
            .number()
            .positive({ message: "Price per hour must be a positive number" })
    })
});


// update validation schema
const updateCarValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
        }).optional(),
        description: z.string({
            invalid_type_error: "Description must be a string",
        }).optional(),
        color: z.string({
            invalid_type_error: "Color must be a string",
        }).optional(),
        isElectric: z.boolean({
            invalid_type_error: "isElectric must be a boolean",
        }).optional(),
        features: z
            .array(z.string({
                invalid_type_error: "Features must be string"
            }))
            .optional(),
        pricePerHour: z
            .number()
            .positive({ message: "Price per hour must be a positive number" })
            .optional(),
    })
});


// car return validation schema
const carReturnValidationSchema = z.object({
    body: z.object({
        bookingId: z.string({
            invalid_type_error: "Booking Id must be a string",
            required_error: "Booking Id is required!"
        }),
        endTime: z.string({
            invalid_type_error: "End time must be a string",
            required_error: "End time is required"
        })
    })
})



export const CarValidation = {
    createCarValidationSchema,
    updateCarValidationSchema,
    carReturnValidationSchema
}