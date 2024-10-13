import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

// Payment Schema Definition
const paymentSchema = new Schema<TPayment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        transactionId: {
            type: String,
            required: true
        },
        paidAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Export the Payment model
export const Payment = model<TPayment>("Payment", paymentSchema);
