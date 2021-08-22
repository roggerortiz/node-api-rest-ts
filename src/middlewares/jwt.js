import jwt from 'jsonwebtoken';
import config from '../config';

const unlessPaths = [
    '/auth/signup',
    '/auth/signin'
]

export default async (req, res, next) => {
    try {
        if(unlessPaths.indexOf(req.url) !== -1)
            return next();

        const headerAuth = req.headers.authorization;

        if (!headerAuth)
            return res.status(403).json({ message: "No token provided" });

        const [label, token] = headerAuth.split(' ');

        if (label !== 'Bearer' || !token)
            return res.status(401).json({ message: "Unauthorized" });

        req.user = jwt.verify(token, config.JWT_SECRET_KEY);

        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};