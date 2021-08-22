import { Schema, model, Document } from 'mongoose';
import { IRole } from './Role';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string,
    username: string,
    password: string,
    roles: IRole[],
    encryptPassword: (password: string) => Promise<string>,
    comparePassword: (password: string, hash: string) => Promise<boolean>
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export default model<IUser>('User', userSchema);