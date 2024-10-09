import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { CarBookingRoutes } from "../modules/booking/booking.route";


const router = Router();

// all routes
const moduleRoutes = [
    {
        path: "",
        route: UserRoutes
    },
    {
        path: "",
        route: AuthRoutes
    },
    {
        path: "/cars",
        route: CarRoutes
    },
    {
        path: "/bookings",
        route: CarBookingRoutes
    },
]


// router
moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;