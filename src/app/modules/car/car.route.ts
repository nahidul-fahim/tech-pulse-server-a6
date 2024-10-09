import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { CarValidation } from "./car.validation";
import { CarController } from "./car.controller";
import { USER_ROLE } from "../user/user.constant";
import { sendImageToCloudinary, upload } from "../../utils/sendImageToCloudinary";


const router = Router();

// create new car
router.post(
    "/",
    auth(USER_ROLE.admin),
    upload.single('file'),
    sendImageToCloudinary,
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(CarValidation.createCarValidationSchema),
    CarController.createNewCar
)

// get all cars
router.get(
    "/",
    CarController.getAllCars
)

// return a car
router.put(
    "/return",
    auth(USER_ROLE.admin),
    validateRequest(CarValidation.carReturnValidationSchema),
    CarController.returnCar
)

// get single car
router.get(
    "/:id",
    CarController.getSingleCar
)

// update single car
router.put(
    "/:id",
    auth(USER_ROLE.admin),
    upload.single('file'),
    sendImageToCloudinary,
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(CarValidation.updateCarValidationSchema),
    CarController.updateCar
)

// delete a car
router.delete(
    "/:id",
    auth(USER_ROLE.admin),
    CarController.deleteCar
)


export const CarRoutes = router;