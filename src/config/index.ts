interface IConfig {
    PORT: string,
    NODE_ENV: string,
    JWT_SECRET_KEY: string,
    MONGODB_URI: string,
    CORS_ORIGIN_WEB_URI: string
}

const config: IConfig = {
    PORT: process.env.PORT || '4000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'jwt-secret-key',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/nodecore',
    CORS_ORIGIN_WEB_URI: process.env.CORS_ORIGIN_WEB_URI || 'http://localhost:3000'
};

export default config;