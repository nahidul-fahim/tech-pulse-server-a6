import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// create new user
const createNewUser = catchAsync(async (req: Request, res: Response) => {
    const studentData = req.body;
    const result = await UserServices.createUserIntoDb(studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result
    })
})

// get user by id
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.getUserByIdFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User fetched successfully",
        data: result
    })
});

// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const result = await UserServices.updateUserInDb(id, userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result
    })
});

// update user status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const result = await UserServices.updateUserStatusInDb(id, userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status updated successfully",
        data: result
    })
});

// get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsersFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: result
    })
});


export const UserController = { createNewUser, getUserById, updateUser, updateUserStatus, getAllUsers };