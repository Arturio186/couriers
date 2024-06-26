import { Router } from "express";
import { body, param } from "express-validator";

import IBusinessController from "../Interfaces/Business/IBusinessController";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";

export default (businessController: IBusinessController) => {
    const router = Router();

    router.post(
        "/create",
        AuthMiddleware,
        OwnerMiddleware,
        body("name").notEmpty(),
        businessController.Store
    );

    router.get(
        "/my",
        AuthMiddleware,
        OwnerMiddleware,
        businessController.GetMyBusiness
    )

    return router;
};