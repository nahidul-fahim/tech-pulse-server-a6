import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();


// sign in user route
router.post(
    "/auth/signin",
    validateRequest(AuthValidation.signInValidationSchema),
    AuthController.signInController
)

// forgot password route
router.post(
    "/auth/forgot-password",
    validateRequest(AuthValidation.forgotPasswordValidationSchema),
    AuthController.forgotPasswordController
)

// reset password route
router.post(
    "/auth/reset-password",
    validateRequest(AuthValidation.resetPasswordValidationSchema),
    AuthController.resetPasswordController
)

export const AuthRoutes = router;