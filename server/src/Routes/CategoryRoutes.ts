import { Router } from "express";
import { query } from "express-validator";
import ICategoryController from "../Interfaces/Category/ICategoryController";

import ValidationMiddleware from "../Middlewares/ValidationMiddleware";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

export default (categoryController: ICategoryController) => {
    const router = Router();

    router.get(
        "/",
        AuthMiddleware,
        query('business_id').isUUID(),
        query('page').notEmpty().isNumeric(),
        query('limit').notEmpty().isNumeric(),
        ValidationMiddleware,
        categoryController.GetCategories
    )

    return router;
};