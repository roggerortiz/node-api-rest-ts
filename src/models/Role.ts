import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
    name: string
}

const roleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model<IRole>('Role', roleSchema);