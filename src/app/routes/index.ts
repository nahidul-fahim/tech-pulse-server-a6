import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import PostRoutes from "../modules/post/post.route";
import commentRoutes from "../modules/comment/comment.route";


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
        path: "/comment",
        route: commentRoutes,
      },
]


// router
moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;