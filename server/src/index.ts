import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import router from "./Routes";

import ErrorMiddleware from "./Middlewares/ErrorMiddleware";

config();

const allowedOrigins = process.env.CLIENTS_URLS.split(",");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use("/api", router);
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
