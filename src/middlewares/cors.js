import cors from 'cors';
import config from '../config';

const whiteList = [
    config.CORS_ORIGIN_WEB_URI
];

const options = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1)
          callback(null, true)
        else
          callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
}

export default cors(options);