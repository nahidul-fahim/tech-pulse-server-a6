import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { sendImageToCloudinary, upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

// create new user
router.post(
    "/auth/signup",
    upload.single('file'),
    sendImageToCloudinary,
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(UserValidation.createUserValidationSchema),
    UserController.createNewUser
);

// get user by id
router.get(
    "/user/:id",
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserController.getUserById
);

// update user
router.put(
    "/user/:id",
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(UserValidation.updateUserValidationSchema),
    UserController.updateUser
);

// update user status
router.put(
    "/user/status/:id",
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.updateUserStatusValidationSchema),
    UserController.updateUserStatus
);

// get all users
router.get(
    "/users",
    auth(USER_ROLE.admin),
    UserController.getAllUsers
);

export const UserRoutes = router;