/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TForgotPassword, TSignInUser } from "./auth.interface";
import { comparePassword, generateToken } from "./auth.utils";
import config from "../../config";
import { resetPasswordTemplate } from "../../utils/resetPasswordTemplate";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from "bcrypt";


// sign in user
const signInUser = async (payload: TSignInUser) => {
    const user = await User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    // checking password
    const isPasswordMatched = comparePassword(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect!")
    }


    const jwtPayload = {
        userId: user?._id,
        userEmail: user?.email,
        userRole: user?.role,
    }

    // generate access token
    const accessToken = generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )


    const { password, ...others } = user.toObject();
    return { others, accessToken };
}

// forgot password
const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const resetPasswordToken = bcrypt.hashSync(user._id.toString(), Number(config.bcrypt_salt_round))
    const resetPasswordTokenExpired = new Date(Date.now() + 1000 * 60 * 60 * 1) // 1 hour
    
    const resetURL = `${config.client_url}/reset-password?token=${resetPasswordToken}`
    const html = resetPasswordTemplate(resetURL)    

    await sendEmail({
        email: user.email,
        subject: "Reset Password",
        html: html
    })

    await User.updateOne(
        { _id: user._id }, { resetPasswordToken, resetPasswordTokenExpired }
    )

    return {
        email: user.email,
        resetURL // TODO: remove this
    }
}

// reset password
const resetPassword = async (token: string, password: string) => {
    const user = await User.findOne({ resetPasswordToken: token })
    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token!");
    }

    const isResetPasswordTokenExpired = user.resetPasswordTokenExpired && user.resetPasswordTokenExpired < new Date()
    if (isResetPasswordTokenExpired) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Reset password token expired!");
    }

    const hashedPassword = bcrypt.hashSync(password, Number(config.bcrypt_salt_round))
    await User.updateOne(
        { _id: user._id },
        { password: hashedPassword, resetPasswordToken: "", resetPasswordTokenExpired: null }
    )

    return {
        message: "Password reset successfully"
    }
}


export const AuthServices = { signInUser, forgotPassword, resetPassword };