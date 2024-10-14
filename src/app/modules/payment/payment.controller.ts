import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

// make payment
const makeNewPayment = catchAsync(async (req: Request, res: Response) => {  // Use correct types here
    const result = await PaymentServices.makePaymentIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Payment successful",
        data: result,
    });
});

// confirmation
const confirmation = async (req: Request, res: Response) => {
    await PaymentServices.confirmPayment(req.query.transactionId as string);
    res.redirect("https://tech-pulse-a6.vercel.app/payment-success");
};

// get all payments
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.getAllPayments();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All payments",
        data: result,
    });
});

// get user payments
const getUserPayments = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.getUserPayments(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User payments",
        data: result,
    });
});

export const PaymentController = {
    makeNewPayment,
    confirmation,
    getAllPayments,
    getUserPayments
};
