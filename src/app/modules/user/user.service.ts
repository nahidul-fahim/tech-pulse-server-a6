/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateToken } from "../auth/auth.utils";
import config from "../../config";

// create new user into db
const createUserIntoDb = async (cloudinaryResult: any, payload: TUser) => {
    // checking if the user exists
    const isExistingUser = await User.isUserExistsByEmail(payload.email)
    if (isExistingUser) {
        throw new AppError(httpStatus.CONFLICT, "The user already exists!")
    }
    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        throw new AppError(httpStatus.BAD_REQUEST, "Profile image upload failed");
    }
    payload.profileImg = cloudinaryResult.secure_url;
    const newUser = await User.create(payload);
    const jwtPayload = {
        userId: newUser?._id,
        userEmail: newUser?.email,
        userRole: newUser?.role,
    }

    // generate access token
    const accessToken = generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = newUser.toObject();
    return { accessToken, others };
}

// get single user by id from db
const getUserByIdFromDb = async (id: string) => {
    const user = await User.findById(id);
    return user;
}

// update user into db
const updateUserInDb = async (id: string, payload: Partial<TUser>) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

// update user status into db
const updateUserStatusInDb = async (id: string, payload: Partial<TUser>) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

// get all users from db
const getAllUsersFromDb = async () => {
    const users = await User.find();
    return users;
};


export const UserServices = { createUserIntoDb, getUserByIdFromDb, updateUserInDb, updateUserStatusInDb, getAllUsersFromDb };