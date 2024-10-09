import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCarBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Car } from "../car/car.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";


// book a car services
const bookACarIntoDB = async (payload: TCarBooking, user: string) => {
    const bookingData = {
        ...payload,
        user: user,
    };

    const isCarBooked = await Car.findById(payload.car).select('status')
    if (isCarBooked?.status === "unavailable") {
        throw new AppError(httpStatus.CONFLICT, "The car is already booked!")
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdBooking = await Booking.create([bookingData], { session });
        if (!createdBooking) {
            throw new AppError(httpStatus.NOT_FOUND, "Failed to create booking")
        }
        const updateCarStatus = await Car.findByIdAndUpdate(
            payload.car,
            { status: 'unavailable' },
            { new: true, session },
        )
        if (!updateCarStatus) {
            throw new AppError(httpStatus.NOT_FOUND, "Failed to book car!")
        }

        await session.commitTransaction();
        await session.endSession();

        const populatedBooking = await Booking.findById(createdBooking[0]._id)
            .populate('car')
            .populate({ path: 'user', select: '-createdAt -updatedAt' })

        return populatedBooking;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.NOT_FOUND, "Failed to book car!")
    }
}


// update a booking
const updateBookingIntoDb = async (bookingId: string, payload: Record<string, unknown>, currentUserRole: string) => {
    const isBookingExist = await Booking.findById(bookingId)
    if (!isBookingExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking not found!", [])
    };
    if (payload.status === "approved" && isBookingExist?.status === "approved") {
        throw new AppError(httpStatus.CONFLICT, "Booking already approved!", [])
    };
    if ((payload?.paidAmount as number) > 0 && !isBookingExist?.endTime) {
        throw new AppError(httpStatus.NOT_FOUND, "The car is not returned yet!", [])
    }
    if (currentUserRole === "user" && payload?.status === "approved") {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to complete the action!")
    }
    const result = await Booking.findByIdAndUpdate(bookingId, payload, { new: true })
    return result;
}


// get user's bookings
const getUsersBookingsFromDb = async (user: string) => {
    const result = await Booking.find({ user })
        .populate('car')
        .populate({ path: 'user', select: '-createdAt -updatedAt' })

    if (result.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found", [])
    }
    return result;
}


// get all bookings for admin
const getAllBookingsFromDb = async (query: Record<string, unknown>) => {

    type TFormattedQuery = {
        car?: string;
        date?: string;
    }
    const formattedQuery: TFormattedQuery = {}

    if (query.carId && typeof query.carId === "string") {
        formattedQuery.car = query.carId;
    }
    if (query.date && typeof query.date === "string") {
        formattedQuery.date = query.date;
    }

    const result = await Booking.find(formattedQuery)
        .populate('car')
        .populate({ path: 'user', select: '-createdAt -updatedAt' })

    if (result.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No data found!", [])
    }
    return result;
}


// get all dashboard info
const getDashboardInfoFromDb = async () => {
    const totalBookingsData = await Booking.find();
    const totalBookings = totalBookingsData.length;
    const availableCars = (await Car.find({ status: 'available' })).length;
    // total paid amount
    const totalPaidAmount = await Booking.aggregate([
        {
            $group: {
                _id: null,
                totalPaidAmount: { $sum: "$paidAmount" }
            }
        }
    ]);
    const paidAmount = totalPaidAmount.length > 0 ? totalPaidAmount[0].totalPaidAmount : 0;
    const activeUser = (await User.find({ isActive: true })).length;
    return { totalBookings, availableCars, paidAmount, activeUser };
}


export const CarBookingServices = {
    bookACarIntoDB,
    getUsersBookingsFromDb,
    getAllBookingsFromDb,
    updateBookingIntoDb,
    getDashboardInfoFromDb
}