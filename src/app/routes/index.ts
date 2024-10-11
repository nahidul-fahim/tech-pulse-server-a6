import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarBookingRoutes } from "../modules/booking/booking.route";
import PostRoutes from "../modules/post/post.route";


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
        path: "/post",
        route: PostRoutes
    },
    {
        path: "/bookings",
        route: CarBookingRoutes
    },
]


// router
moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;