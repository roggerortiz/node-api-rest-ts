import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Role, { IRole } from '../models/Role';
import { IPayload } from '../middlewares/jwt';
import { jwtSign } from '../libs/helpers';

export const signUp = async (req: Request, res: Response) => {
    const { email, username, password, roles } = req.body;

    const newUser: IUser = new User({ email, username, password });
    newUser.password = await newUser.encryptPassword(newUser.password);

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const userRole: IRole | null = await Role.findOne({ name: 'admin' });
        newUser.roles = userRole !== null ? [userRole._id] : [];
    }

    const createdUser: IUser = await newUser.save();

    const payload: IPayload = {
        roles: createdUser.roles.map((role: IRole) => role._id)
    }

    const token: string = jwtSign(payload, createdUser._id);

    res.json({ token });
}

export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userSigned: IUser | null = await User.findOne({ username }).populate('roles');
    if(!userSigned) return res.status(400).json({ token: null, message: "User not found!" });

    const isValidPassword: boolean = await userSigned.comparePassword(password, userSigned.password);
    if(!isValidPassword) return res.status(400).json({ token: null, message: "Wrong password!" });

    const payload: IPayload = {
        roles: userSigned.roles.map((role: IRole) => role._id)
    }

    const token: string = jwtSign(payload, userSigned._id);

    res.json({ token });
}