import { Request, Response } from 'express';
import User, { IUser } from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const user: IUser | null = await User.findById(req.params.id);
    res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const newUser: IUser = new User({ email, username, password });
    newUser.password = await newUser.encryptPassword(newUser.password);
    const createdUser: IUser = await newUser.save();
    res.status(201).json(createdUser);
};

export const updateUserById = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const updatedUser: IUser | null = await User.findByIdAndUpdate(req.params.id, { email, username, password }, { new: true }); // : await User.encryptPassword(password)
    res.status(200).json(updatedUser);
};

export const deleteUserById = async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json();
};