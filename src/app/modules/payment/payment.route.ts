import express from "express";
import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentValidation } from "./payment.validation";

const router = express.Router();

// make payment
router.post(
    "/make-payment",
    auth('admin', 'user'),
    validateRequest(PaymentValidation.makePaymentValidationSchema),
    PaymentController.makeNewPayment
);

// confirmation
router.post(
    "/confirmation",
    PaymentController.confirmation
)

// get all payments
router.get(
    "/all-payments",
    auth('admin'),
    PaymentController.getAllPayments
)

// get user payments
router.get(
    "/user-payments/:id",
    PaymentController.getUserPayments
)

const PaymentRoutes = router;
export default PaymentRoutes;
