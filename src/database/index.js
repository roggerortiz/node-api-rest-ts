import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        });
        console.log('>> DB is connected!');
    } catch (error) {
        console.log('>> Failed connection to DB!');
        console.log(error);
    }
}