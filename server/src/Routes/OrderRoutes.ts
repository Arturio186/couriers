import { Router } from "express";
import { query } from "express-validator";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";

import IOrderController from "../Interfaces/Order/IOrderController";

export default (orderController: IOrderController) => {
    const router = Router();

    router.get(
        "/active",
        AuthMiddleware,
        query('branch_id').isUUID(),
        ValidationMiddleware,
        orderController.GetActiveOrders
    )

    return router;
};