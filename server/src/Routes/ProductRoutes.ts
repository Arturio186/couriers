import { Router } from "express";
import { body, param, query } from "express-validator";
import IProductController from "../Interfaces/Product/IProductController";

import ValidationMiddleware from "../Middlewares/ValidationMiddleware";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";

export default (productController: IProductController) => {
    const router = Router();

    router.get(
        "/",
        AuthMiddleware,
        query('category_id').isUUID(),
        ValidationMiddleware,
        productController.GetProducts
    )

    router.get(
        "/assortment",
        AuthMiddleware,
        query('business_id').isUUID(),
        ValidationMiddleware,
        productController.GetAssortment
    )

    router.post(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        body('category_id').isUUID(),
        body('name').notEmpty(),
        body('price').isNumeric(),
        ValidationMiddleware,
        productController.Store
    )

    router.delete(
        "/:product_id",
        AuthMiddleware,
        OwnerMiddleware,
        param("product_id").isUUID(),
        ValidationMiddleware,
        productController.Destroy
    )

    router.put(
        "/:product_id",
        AuthMiddleware,
        OwnerMiddleware,
        param("product_id").isUUID(),
        body('name').notEmpty(),
        body('price').isNumeric(),
        ValidationMiddleware,
        productController.Update
    )

    return router;
};