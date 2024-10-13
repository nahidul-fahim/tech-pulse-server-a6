import { z } from "zod";

const makePaymentValidationSchema = z.object({
    body: z.object({
        userId: z.string({
            invalid_type_error: "User ID must be a string",
            required_error: "User IDis required"
        }),
    })
});

export const PaymentValidation = {
    makePaymentValidationSchema
}