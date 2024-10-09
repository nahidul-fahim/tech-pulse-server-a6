import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser {
    name: string;
    email: string;
    role: "user" | "admin";
    password: string;
    phone: string;
    address: string;
    preferences?: string;
    isActive?: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpired?: Date;
}

export interface UserModel extends Model<TUser> {
    // checking if user exists already
    isUserExistsByEmail(email: string): Promise<TUser>
}


export type TUserRole = keyof typeof USER_ROLE;