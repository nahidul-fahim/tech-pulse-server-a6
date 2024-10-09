import { Schema, model, Types } from "mongoose";
import { BookingModel, TCarBooking } from "./booking.interface";

// Booking Schema Definition
const bookingSchema = new Schema<TCarBooking, BookingModel>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        nidPassport: {
            type: String,
            required: [true, "NID or Passport is required"],
            trim: true,
        },
        drivingLicense: {
            type: String,
            required: [true, "Driving license is required"],
            trim: true,
        },
        car: {
            type: Schema.Types.ObjectId,
            required: [true, "Car ID is required"],
            ref: "Car",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
            required: true,
        },
        date: {
            type: String,
            required: [true, "Date is required"],
            trim: true,
        },
        startTime: {
            type: String,
            required: [true, "Start time is required"],
            trim: true,
        },
        endTime: {
            type: String,
            default: null,
            trim: true,
        },
        totalCost: {
            type: Number,
            default: 0,
            required: true,
            trim: true,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "bankTransfer"],
            required: true,
        },
        additionalOptions: {
            childSeat: {
                type: Boolean,
                default: false,
            },
            gpsNavigation: {
                type: Boolean,
                default: false,
            },
            additionalDriver: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Static method for checking if booking exists
bookingSchema.statics.isBookingExistsById = async function (id: Types.ObjectId) {
    return await this.findById(id);
};

// Export the Booking model
export const Booking = model<TCarBooking, BookingModel>("Booking", bookingSchema);
