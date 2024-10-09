import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// sing in user controller
const signInController = catchAsync(async (req, res) => {
    const result = await AuthServices.signInUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result.others,
        token: result.accessToken
    })
})

// forgot password controller
const forgotPasswordController = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await AuthServices.forgotPassword(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset email sent successfully",
        data: result // TODO: remove this
    })
})

// reset password controller
const resetPasswordController = catchAsync(async (req, res) => {
    const { token, password } = req.body;
    await AuthServices.resetPassword(token, password);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully",
        data: {}
    })
})


export const AuthController = { signInController, forgotPasswordController, resetPasswordController };