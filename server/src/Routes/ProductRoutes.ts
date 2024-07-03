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

    return router;
};