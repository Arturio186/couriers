import { Router } from "express";
import { body, param, query } from "express-validator";
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
        "/:category_id",
        AuthMiddleware,
        OwnerMiddleware,
        param('category_id').isUUID(),
        ValidationMiddleware,
        categoryController.Destroy
    )

    router.put(
        "/:category_id",
        AuthMiddleware,
        OwnerMiddleware,
        param('category_id').isUUID(),
        body('name').notEmpty(),
        ValidationMiddleware,
        categoryController.Update
    )

    return router;
};