import { Router } from "express";
import { body, param, query } from "express-validator";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";
import IBranchController from "../Interfaces/Branch/IBranchController";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";

export default (branchController: IBranchController) => {
    const router = Router();

    router.get(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        query('business_id').isUUID(),
        ValidationMiddleware,
        branchController.GetByBusiness
    )

    return router;
};