import cors, { CorsOptions } from "cors";
import config from "../config";

const whiteList: string[] = [config.CORS_ORIGIN_WEB_URI];

const options: CorsOptions = {
  origin: (origin: any, callback: (err: any, origin?: any) => void) => {
    const isDevelopment: boolean = (config.NODE_ENV === 'development');
    if (isDevelopment || whiteList.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
};

export default cors(options);
