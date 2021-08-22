import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string,
    catgory: string,
    price: string,
    imgURL: string
}

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
});

export default model<IProduct>('Product', productSchema);