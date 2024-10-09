import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";
import { CarBooking } from "./booking.controller";

const router = Router();

// book a car
router.post(
    "/",
    auth(USER_ROLE.user),
    validateRequest(BookingValidation.carBookingValidationSchema),
    CarBooking.bookACar
)

// update a booking
router.put(
    "/:bookingId",
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(BookingValidation.updateBookingStatusValidation),
    CarBooking.updateBooking
)

// get user's bookings
router.get(
    "/my-bookings",
    auth(USER_ROLE.user),
    CarBooking.getUsersBookings
)

// get all bookings for admin
router.get(
    "/",
    auth(USER_ROLE.admin),
    CarBooking.getAllBookings
)

// get all dashboard info
router.get(
    "/dashboard-info",
    auth(USER_ROLE.admin),
    CarBooking.getDashboardInfo
)



export const CarBookingRoutes = router;