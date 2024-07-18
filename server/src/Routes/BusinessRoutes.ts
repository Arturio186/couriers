import { Router } from "express";
import { body, param, query } from "express-validator";

import IBusinessController from "../Interfaces/Business/IBusinessController";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";

export default (businessController: IBusinessController) => {
    const router = Router();

    router.post(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        body("name").notEmpty(),
        ValidationMiddleware,
        businessController.Store
    );

    router.put(
        "/:id",
        AuthMiddleware,
        OwnerMiddleware,
        param("id").notEmpty().isUUID(),
        body("name").notEmpty(),
        ValidationMiddleware,
        businessController.Update
    );

    router.delete(
        "/:id",
        AuthMiddleware,
        OwnerMiddleware,
        param("id").notEmpty().isUUID(),
        ValidationMiddleware,
        businessController.Destroy
    );

    router.get(
        "/my",
        AuthMiddleware,
        OwnerMiddleware,
        businessController.GetMyBusinesses
    )

    router.get(
        "/sales-statistic",
        AuthMiddleware,
        OwnerMiddleware,
        query('business_id').isUUID(),
        ValidationMiddleware,
        businessController.GetBranchesSales
    )

    router.get(
        "/:id",
        AuthMiddleware,
        param("id").notEmpty().isUUID(),
        ValidationMiddleware,
        businessController.GetBusiness
    )

    return router;
};