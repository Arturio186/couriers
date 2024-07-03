import { Request, Response, NextFunction } from "express";

import IProductController from "../Interfaces/Product/IProductController";
import IProductService from "../Interfaces/Product/IProductService";

class ProductController implements IProductController {
    private readonly ProductService: IProductService;

    constructor(productService: IProductService) {
        this.ProductService = productService;
    }

    public GetProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { category_id } = req.query;

            const products = await this.ProductService.GetProducts(
                String(category_id),
                res.locals.user.id
            );

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };
}

export default ProductController;
