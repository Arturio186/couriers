import { Request, Response, NextFunction } from "express";

import ICategoryController from "../Interfaces/Category/ICategoryController";
import ICategoryService from "../Interfaces/Category/ICategoryService";

class CategoryController implements ICategoryController {
    private readonly CategoryService: ICategoryService;

    constructor(categoryService: ICategoryService) {
        this.CategoryService = categoryService;
    }

    public Store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { business_id, name } = req.body;

            const createdCategory = await this.CategoryService.SaveCategory(
                business_id,
                name,
                res.locals.user.id
            );

            res.status(200).json(createdCategory);
        } catch (error) {
            next(error);
        }
    };

    public Destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { category_id } = req.params

            await this.CategoryService.RemoveCategory(
                category_id,
                res.locals.user.id
            );

            res.status(200).json("Success");
        } catch (error) {
            next(error);
        }
    };

    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { category_id } = req.params;
            const { name } = req.body;

            const updatedCategory = await this.CategoryService.UpdateCategory(
                category_id,
                name,
                res.locals.user.id
            );

            res.status(200).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    };

    public GetCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { business_id } = req.query;

            const categories = await this.CategoryService.GetCategories(
                String(business_id),
                res.locals.user.id
            );

            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    };
}

export default CategoryController;
