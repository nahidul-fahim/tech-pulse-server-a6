import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// create new user into db
const createUserIntoDb = async (payload: TUser) => {
    // checking if the user exists
    const isExistingUser = await User.isUserExistsByEmail(payload.email)
    if (isExistingUser) {
        throw new AppError(httpStatus.CONFLICT, "The user already exists!")
    }
    const newUser = await User.create(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = newUser.toObject();
    return others;
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