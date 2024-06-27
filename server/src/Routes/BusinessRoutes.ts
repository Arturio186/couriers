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

    router.put(
        "/:id",
        AuthMiddleware,
        OwnerMiddleware,
        param("id").notEmpty().isUUID(),
        body("name").notEmpty(),
        businessController.Update
    );

    router.delete(
        "/:id",
        AuthMiddleware,
        OwnerMiddleware,
        param("id").notEmpty().isUUID(),
        businessController.Destroy
    );

    router.get(
        "/my",
        AuthMiddleware,
        OwnerMiddleware,
        businessController.GetMyBusinesses
    )

    router.get(
        "/:id",
        AuthMiddleware,
        OwnerMiddleware,
        param("id").notEmpty().isUUID(),
        businessController.GetBusiness
    )

    return router;
};