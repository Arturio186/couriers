import { Router } from "express";
import { query, body, param} from "express-validator";

import AuthMiddleware from "../Middlewares/AuthMiddleware";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";

import IOrderController from "../Interfaces/Order/IOrderController";
import OperatorMiddleware from "../Middlewares/OperatorMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";

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

    router.get(
        "/last-two-weeks",
        AuthMiddleware,
        OwnerMiddleware,
        query('business_id').isUUID(),
        ValidationMiddleware,
        orderController.GetLastTwoWeeksOrdersCount
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
        body("delivery_time").isISO8601(),
        ValidationMiddleware,
        orderController.Store
    )

    router.patch(
        "/finish/:order_id",
        AuthMiddleware,
        OperatorMiddleware,
        param("order_id").isUUID(),
        ValidationMiddleware,
        orderController.Finish
    )

    router.delete(
        "/:order_id",
        AuthMiddleware,
        OperatorMiddleware,
        param("order_id").isUUID(),
        ValidationMiddleware,
        orderController.Destroy
    )

    return router;
};