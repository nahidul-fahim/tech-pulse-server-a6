import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// create new user
const createNewUser = catchAsync(async (req: Request, res: Response) => {
    const studentData = req.body;
    const cloudinaryResult = req.cloudinaryResult;
    const result = await UserServices.createUserIntoDb(cloudinaryResult, studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result.others,
        token: result.accessToken
    })
})

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
    const cloudinaryResult = req.cloudinaryResult;
    const result = await UserServices.updateUserInDb(cloudinaryResult, id, userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result
    })
});

// block user
const manageUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.manageUserInDb(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status updated",
        data: result
    })
});


// create new admin
const createNewAdmin = catchAsync(async (req: Request, res: Response) => {
    const adminData = req.body;
    const result = await UserServices.createAdminIntoDb(adminData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin registered successfully",
        data: result
    })
})

// admin dashboard data
const adminDashboardData = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.adminDashboardDataFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin dashboard data fetched successfully",
        data: result
    })
})

export const UserController = {
    createNewUser,
    getUserById,
    updateUser,
    getAllUsers,
    manageUser,
    createNewAdmin,
    adminDashboardData
};