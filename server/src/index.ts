import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import router from "./Routes";

import ErrorMiddleware from "./Middlewares/ErrorMiddleware";

config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router)
app.use(ErrorMiddleware)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
