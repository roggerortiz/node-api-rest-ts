import User from "../models/User";

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
};

export const createUser = async (req, res) => {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username, password: await User.encryptPassword(password) });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
};

export const updateUserById = async (req, res) => {
    const { email, username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { email, username, password: await User.encryptPassword(password) }, { new: true });
    res.status(200).json(updatedUser);
};

export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json();
};