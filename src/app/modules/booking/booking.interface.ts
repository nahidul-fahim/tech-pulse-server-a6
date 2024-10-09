import { Model, Types } from "mongoose";

export interface TCarBooking {
    name: string;
    email: string;
    phone: string;
    nidPassport: string;
    drivingLicense: string;
    car: Types.ObjectId;
    user: Types.ObjectId;
    status: "pending" | "approved" | "cancelled";
    date: string;
    paidAmount?: number;
    startTime: string;
    endTime: null | string;
    totalCost: number;
    paymentMethod: "cash" | "card" | "bankTransfer";
    additionalOptions: {
        childSeat: boolean;
        gpsNavigation: boolean;
        additionalDriver: boolean;
    }
}

export interface BookingModel extends Model<TCarBooking> {
    // checking if the booking exists
    isBookingExistsById(id: Types.ObjectId): Promise<TCarBooking>
}