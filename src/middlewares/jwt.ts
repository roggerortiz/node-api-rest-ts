import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface IPayload {
    roles: string[],
    iat?: number,
    exp?: number,
    sub?: string
}

const unlessPaths: string[] = [
    '/auth/signup',
    '/auth/signin'
]

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(unlessPaths.indexOf(req.url) !== -1)
            return next();

        const headerAuth = req.headers.authorization;

        if (!headerAuth)
            return res.status(403).json({ message: "No token provided" });

        const [label, token] = headerAuth.split(' ');

        if (label !== 'Bearer' || !token)
            return res.status(401).json({ message: "Unauthorized" });

        const payload: IPayload = jwt.verify(token, config.JWT_SECRET_KEY) as IPayload;

        req['user'] = payload;

        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};