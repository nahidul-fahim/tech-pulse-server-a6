import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CarServices } from "./car.service";


// create new car controller
const createNewCar = catchAsync(async (req: Request, res: Response) => {
    const carData = req.body;
    const cloudinaryResult = req.cloudinaryResult;
    const result = await CarServices.createNewCarIntoDb(cloudinaryResult, carData);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Car created successfully",
        data: result
    })
})


// get all car controller
const getAllCars = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.getAllCarsFromDb(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cars retrieved successfully",
        data: result
    })
})


// get single car controller
const getSingleCar = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CarServices.getSingleCarFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "A Car retrieved successfully",
        data: result
    })
})


// update car controller
const updateCar = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const cloudinaryResult = req.cloudinaryResult;
    const updatedCarData = req.body;
    const result = await CarServices.updateCarIntoDb(cloudinaryResult, id, updatedCarData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car updated successfully",
        data: result
    })
})


// delete car controller
const deleteCar = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CarServices.deleteCarFromDb(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car deleted successfully",
        data: result
    })
})


// return car controller
const returnCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.returnCarIntoDb(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car returned successfully",
        data: result
    })
})


export const CarController = {
    createNewCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar
};