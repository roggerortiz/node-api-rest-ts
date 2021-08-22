import { config } from "dotenv";
import { connectDB } from "./database";
import { createRoles } from "./libs/init";
import { startServer } from "./server";

config();

connectDB();

createRoles();

startServer();
