import jwt from 'jsonwebtoken';
import config from '../config';
import { IPayload } from '../middlewares/jwt';

export const jwtSign = (payload: IPayload, userId: string): string => {
    const token: string = jwt.sign(
        payload,
        config.JWT_SECRET_KEY,
        {
            algorithm: "HS256",
            subject: userId,
            expiresIn: '1d'
        }
    );

    return token;
}