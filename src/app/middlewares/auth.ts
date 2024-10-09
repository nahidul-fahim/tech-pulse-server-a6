import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        // checking if the token exists
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
        }

        // checking if the provided token is valid
        jwt.verify(
            token,
            config.jwt_access_secret as string,
            function (err, decoded) {
                if (err) {
                    throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
                }
                const { userRole } = decoded as JwtPayload;

                // checking for the right user role
                if (requiredRoles && !requiredRoles.includes(userRole)) {
                    throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
                }
                req.user = decoded as JwtPayload;
                next();
            }
        );
    })
};


export default auth;