/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar, TCarReturn } from "./car.interface";
import { Car } from "./car.model";
import { Booking } from "../booking/booking.model";
import mongoose from "mongoose";
import { totalTime } from "./car.utils";
import QueryBuilder from "../../builder/QueryBuilder";


// create new car into db
const createNewCarIntoDb = async (cloudinaryResult: any, payload: TCar) => {
    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        throw new AppError(httpStatus.BAD_REQUEST, "Car image upload failed");
    }
    // save image to payload
    payload.image = cloudinaryResult.secure_url;
    const result = await Car.create(payload);
    return result;
}

// get all cars from db
const getAllCarsFromDb = async (query: Record<string, unknown>) => {
    const searchableFields = ["name", "description"];
    const carQuery = new QueryBuilder(Car.find(), query)
        .search(searchableFields)
        .filter()

    // getting all cars
    const allCars = await carQuery.modelQuery;

    // getting the min price per hour
    const lowestPriceCar = await Car.find().sort({ pricePerHour: 1 }).limit(1);
    // getting the max price per hour
    const highestPriceCar = await Car.find().sort({ pricePerHour: -1 }).limit(1);
    const minPricePerHour = lowestPriceCar[0].pricePerHour;
    const maxPricePerHour = highestPriceCar[0].pricePerHour;
    // get all unique car types
    const uniqueCarTypes = await Car.distinct('carType');
    return { allCars, uniqueCarTypes, minPricePerHour, maxPricePerHour };
};

// get a single car
const getSingleCarFromDb = async (id: string) => {
    const result = await Car.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No data found!", [])
    }
    return result;
}

// update car data
const updateCarIntoDb = async (cloudinaryResult: any, id: string, payload: Partial<TCar>) => {
    if (cloudinaryResult && cloudinaryResult.secure_url) {
        // Update the payload with the new image URL
        payload.image = cloudinaryResult.secure_url;
    }
    const result = await Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
}

// delete a car
const deleteCarFromDb = async (id: string) => {
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
            runValidators: true
        });
    return result;
}

// return a car and update necessary data
const returnCarIntoDb = async (payload: TCarReturn) => {
    const id = payload?.bookingId;
    const booking = await Booking.isBookingExistsById(id);
    if (!booking) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking not found!")
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // update car status
        const updateCarStatus = await Car.findByIdAndUpdate(
            booking?.car,
            { status: 'available' },
            { new: true, session }
        );
        if (!updateCarStatus) {
            throw new AppError(httpStatus.NOT_FOUND, "Failed to return car!");
        }

        // calculate total cost
        const totalBookedTime = await totalTime(
            booking?.startTime as string,
            payload?.endTime as string
        );

        const car = await Car.findById(booking?.car);

        const totalCost = (totalBookedTime * (car?.pricePerHour as number)).toFixed(2);
        const updatedTotalCost = await Booking.findByIdAndUpdate(
            id,
            { totalCost: totalCost, endTime: payload?.endTime },
            { new: true, session }
        )
            .populate('car')
            .populate({ path: 'user', select: '-createdAt -updatedAt' });

        await session.commitTransaction();
        await session.endSession();

        return updatedTotalCost;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.NOT_FOUND, "Failed to return car")
    }
};


export const CarServices = {
    createNewCarIntoDb,
    getAllCarsFromDb,
    getSingleCarFromDb,
    updateCarIntoDb,
    deleteCarFromDb,
    returnCarIntoDb
};