import { Router } from "express";
import { query, body} from "express-validator";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";

import IOrderController from "../Interfaces/Order/IOrderController";
import OperatorMiddleware from "../Middlewares/OperatorMiddleware";

export default (orderController: IOrderController) => {
    const router = Router();

    router.get(
        "/active",
        AuthMiddleware,
        query('branch_id').isUUID(),
        ValidationMiddleware,
        orderController.GetActiveOrders
    )

    router.get(
        "/products",
        AuthMiddleware,
        query('order_id').isUUID(),
        ValidationMiddleware,
        orderController.GetOrderProducts
    )

    router.post(
        "/",
        AuthMiddleware,
        OperatorMiddleware,
        body("branch_id").isUUID(),
        body("client_name").notEmpty(),
        body("client_phone").notEmpty(),
        body("courier_id").optional({ nullable: true }).isUUID(),
        body("lat").isNumeric(),
        body("long").isNumeric(),
        body("address").notEmpty(),
        body("status_id").isNumeric(),
        body("delivery_time").isISO8601(),
        ValidationMiddleware,
        orderController.Store
    )

    return router;
};