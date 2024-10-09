import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const comparePassword = (inputPassword: string, userPassword: string) => {
    return bcrypt.compareSync(inputPassword, userPassword)
}

export const generateToken = (
    jwtPayload: { userEmail: string, userRole: string },
    secret: string,
    expiresIn: string
) => {
    return jwt.sign(jwtPayload, secret, { expiresIn });
};