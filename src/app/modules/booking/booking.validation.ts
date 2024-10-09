import { z } from "zod";

const carBookingValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required",
        }),
        email: z.string({
            invalid_type_error: "Email must be a string",
            required_error: "Email is required",
        }),
        phone: z.string({
            invalid_type_error: "Phone number must be a string",
            required_error: "Phone number is required",
        }),
        nidPassport: z.string({
            invalid_type_error: "NID or Passport must be a string",
            required_error: "NID or Passport is required",
        }),
        drivingLicense: z.string({
            invalid_type_error: "Driving license must be a string",
            required_error: "Driving license is required",
        }),
        carId: z.string({
            invalid_type_error: "Car ID must be a string",
            required_error: "Car ID is required",
        }),
        date: z.string({
            invalid_type_error: "Date must be a string",
            required_error: "Date is required",
        }),
        startTime: z.string({
            invalid_type_error: "Start time must be a string",
            required_error: "Start time is required",
        }),
        endTime: z.string({
            invalid_type_error: "End time must be a string",
        }).nullable().optional(),
        paymentMethod: z.enum(["cash", "card", "bankTransfer"], {
            invalid_type_error: "Payment method must be 'cash', 'card', or 'bankTransfer'",
            required_error: "Payment method is required",
        }),
        additionalOptions: z.object({
            childSeat: z.boolean().optional(),
            gpsNavigation: z.boolean().optional(),
            additionalDriver: z.boolean().optional(),
        }).optional(),
    }),
});


const updateBookingStatusValidation = z.object({
    body: z.object({
        status: z.enum(["approved", "cancelled"]).optional(),
        paidAmount: z.number({
            invalid_type_error: "Paid amount must be a number!",
        }).optional()
    })
})


export const BookingValidation = {
    carBookingValidationSchema,
    updateBookingStatusValidation
}