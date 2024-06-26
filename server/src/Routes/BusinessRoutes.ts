import { Router } from "express";
import { body, param } from "express-validator";

import IBusinessController from "../Interfaces/Business/IBusinessController";

import AuthMiddleware from "../Middlewares/AuthMiddleware";

export default (businessController: IBusinessController) => {
    const router = Router();

    router.post(
        "/create",
        AuthMiddleware,
        body("name").notEmpty(),
        businessController.Store
    );

    return router;
};