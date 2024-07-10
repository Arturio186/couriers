import { Router } from "express";
import { body, param, query } from "express-validator";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";
import IBranchController from "../Interfaces/Branch/IBranchController";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";
import OperatorMiddleware from "../Middlewares/OperatorMiddleware";

export default (branchController: IBranchController) => {
    const router = Router();

    router.get(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        query("business_id").isUUID(),
        ValidationMiddleware,
        branchController.GetByBusiness
    );

    router.post(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        body("name").notEmpty(),
        body("business_id").notEmpty().isUUID(),
        body("city_id").notEmpty().isNumeric(),
        ValidationMiddleware,
        branchController.Store
    );

    router.delete(
        "/:branch_id",
        AuthMiddleware,
        OwnerMiddleware,
        param("branch_id").notEmpty().isUUID(),
        ValidationMiddleware,
        branchController.Destroy
    )

    router.put(
        "/:branch_id",
        AuthMiddleware,
        OwnerMiddleware,
        param("branch_id").notEmpty().isUUID(),
        body("name").notEmpty(),
        body("city_id").notEmpty().isNumeric(),
        ValidationMiddleware,
        branchController.Update
    );

    router.get(
        "/my",
        AuthMiddleware,
        OperatorMiddleware,
        branchController.GetUserBranches
    )

    router.get(
        "/android-my",
        query("user_id").isUUID(),
        ValidationMiddleware,
        branchController.GetAndroidUserBranches
    )

    router.post(
        "/join",
        AuthMiddleware,
        OperatorMiddleware,
        body("branch_id").isUUID(),
        ValidationMiddleware,
        branchController.JoinBrnach
    )

    return router;
};
