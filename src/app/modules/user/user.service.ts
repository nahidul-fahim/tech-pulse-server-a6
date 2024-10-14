/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateToken } from "../auth/auth.utils";
import config from "../../config";
import { Payment } from "../payment/payment.model";
import { Post } from "../post/post.model";

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
const updateUserInDb = async (cloudinaryResult: any, id: string, payload: Partial<TUser>) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if (cloudinaryResult && cloudinaryResult.secure_url) {
        payload.profileImg = cloudinaryResult.secure_url;
    }
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

// get all users from db
const getAllUsersFromDb = async () => {
    const users = await User.find();
    return users;
};

// block/unblock user in db
const manageUserInDb = async (id: string, payload: Record<string, any>) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};


// create admin into admin
const createAdminIntoDb = async (payload: TUser) => {
    // checking if the user exists
    const isExistingUser = await User.isUserExistsByEmail(payload.email)
    if (isExistingUser) {
        throw new AppError(httpStatus.CONFLICT, "The user already exists!")
    }
    payload.role = 'admin';
    const result = await User.create(payload);
    return result;
};

// Function to get monthly data for users, posts, and payments
const adminDashboardDataFromDb = async () => {
    const currentYear = new Date().getFullYear();

    // Helper function to fill in missing months with zero counts
    const fillMissingMonths = (data: any, field: any) => {
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const filledData = months.map(month => {
            const found = data.find((item: any) => item._id === month);
            return found ? found : { _id: month, [field]: 0 };
        });
        return filledData;
    };

    // Aggregate user data by month
    const monthlyUsers = await User.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                userCount: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    const filledMonthlyUsers = fillMissingMonths(monthlyUsers, 'userCount');

    // Aggregate post data by month
    const monthlyPosts = await Post.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" }, 
                postCount: { $sum: 1 } 
            }
        },
        {
            $sort: { _id: 1 } 
        }
    ]);
    const filledMonthlyPosts = fillMissingMonths(monthlyPosts, 'postCount');


    const monthlyPayments = await Payment.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                totalAmount: { $sum: "$paidAmount" }
            }
        },
        {
            $sort: { _id: 1 } 
        }
    ]);
    const filledMonthlyPayments = fillMissingMonths(monthlyPayments, 'totalAmount');


    return {
        users: filledMonthlyUsers,
        posts: filledMonthlyPosts,
        payments: filledMonthlyPayments
    };
};


export const UserServices = {
    createUserIntoDb,
    getUserByIdFromDb,
    updateUserInDb,
    getAllUsersFromDb,
    manageUserInDb,
    createAdminIntoDb,
    adminDashboardDataFromDb
};