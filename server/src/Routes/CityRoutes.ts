import { Router } from "express";
import { query } from "express-validator";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import ICityController from "../Interfaces/City/ICityController";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";

export default (cityController: ICityController) => {
    const router = Router();

    router.get(
        "/find",
        AuthMiddleware,
        OwnerMiddleware,
        query('name').isString(),
        ValidationMiddleware,
        cityController.FindByName
    )

    return router;
};