import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import UserModel from "./Models/UserModel";
import UserRoutes from "./Routes/UserRoutes";
import UserController from "./Controllers/UserController";
import UserService from "./Services/UserService";

config();

const userService = new UserService(UserModel)
const userController = new UserController(userService)

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', UserRoutes(userController))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
