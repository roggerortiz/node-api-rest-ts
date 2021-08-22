import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const { email, username, password, roles } = req.body;

    const newUser = new User({
        email,
        username,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const userRole = await Role.findOne({ name: 'admin' });
        newUser.roles = [userRole._id];
    }

    const createdUser = await newUser.save();

    const token = jwt.sign(
        { payload: { roles } },
        config.JWT_SECRET_KEY,
        {
            algorithm: "HS256",
            subject: createdUser._id.toString(),
            expiresIn: '1d'
        }
    );

    res.json({ token });
}

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).populate('roles');
    if(!user) return res.status(400).json({ token: null, message: "User not found!" });

    const isValidPassword = await User.comparePassword(password, user.password);
    if(!isValidPassword) return res.status(400).json({ token: null, message: "Wrong password!" });

    const token = jwt.sign(
        { payload: { roles: user.roles.map(role => role._id) } },
        config.JWT_SECRET_KEY,
        {
            algorithm: "HS256",
            subject: user._id.toString(),
            expiresIn: '1d'
        }
    );

    res.json({ token });
}