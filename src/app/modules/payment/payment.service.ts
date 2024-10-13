/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TPayment } from "./payment.interface";
import { initiatePayment } from "./payment.utils";
import { Payment } from "./payment.model";


// create new post into db
const makePaymentIntoDb = async (payload: Partial<TPayment>) => {
    const userId = payload.userId;
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000000000)}`
    // Update user data with the transaction ID
    await User.findByIdAndUpdate(userId, { transactionId }, { new: true });
    const paymentData = {
        transactionId,
        userName: user.name,
        userEmail: user.email,
    }
    const paymentSession = await initiatePayment(paymentData);
    return paymentSession;
};


// confirmation payment
const confirmPayment = async (transactionId: string) => {
    await User.findOneAndUpdate({ transactionId }, {
        isSubscribed: true
    }, { new: true })
    const user = await User.findOne({ transactionId })
    const payload = {
        userId: user?._id,
        transactionId: user?.transactionId,
        paidAmount: 20
    }
    await Payment.create(payload)
};

// get all payments
const getAllPayments = async () => {
    const payments = await Payment.find().populate("userId");
    // Calculate total of paidAmount field
    const totalPaymentAmount = payments.reduce((total, payment) => {
        return total + payment.paidAmount;
    }, 0);
    return { payments, totalPaymentAmount };
};


// get user payments
const getUserPayments = async (userId: string) => {
    const payments = await Payment.find({ userId }).populate("userId");
    return payments;
};


export const PaymentServices = {
    makePaymentIntoDb,
    confirmPayment,
    getAllPayments,
    getUserPayments
};
