import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from '../config';
import jwt from '../middlewares/jwt';
import cors from '../middlewares/cors';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import productRoutes from '../routes/product.routes';

const app = express();

// variables
app.set('port', config.PORT);

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors);
app.use(jwt);

//routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

export const startServer = () => {
    app.listen({ port: app.get('port') }, () => {
        console.log(`>> Server listen on http://localhost:${app.get('port')}`);
    });
}