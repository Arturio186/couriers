import { Router } from "express";
import { body, query } from "express-validator";
import ICategoryController from "../Interfaces/Category/ICategoryController";

import ValidationMiddleware from "../Middlewares/ValidationMiddleware";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware";

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

    router.post(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        body('business_id').isUUID(),
        body('name').notEmpty(),
        ValidationMiddleware,
        categoryController.Store
    )

    router.delete(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        body('business_id').isUUID(),
        body('category_id').isUUID(),
        ValidationMiddleware,
        categoryController.Destroy
    )

    router.put(
        "/",
        AuthMiddleware,
        OwnerMiddleware,
        body('business_id').isUUID(),
        body('category_id').isUUID(),
        body('name').notEmpty(),
        ValidationMiddleware,
        categoryController.Update
    )

    return router;
};