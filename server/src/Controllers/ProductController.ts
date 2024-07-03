import { Request, Response, NextFunction } from "express";

import IProductController from "../Interfaces/Product/IProductController";
import IProductService from "../Interfaces/Product/IProductService";

class ProductController implements IProductController {
    private readonly ProductService: IProductService;

    constructor(productService: IProductService) {
        this.ProductService = productService;
    }

    public Store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { category_id, name, price } = req.body;

            const createdProduct = await this.ProductService.SaveProduct(category_id, name, price, res.locals.user.id)

            res.status(200).json(createdProduct)
        }
        catch (error) {
            next(error);
        }
    }

    public Destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { product_id } = req.params;

            await this.ProductService.RemoveProduct(product_id, res.locals.user.id)

            res.status(200).json("Success")
        }
        catch (error) {
            next(error);
        }
    }

    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { product_id } = req.params;
            const { name, price } = req.body;

            const updatedProduct = await this.ProductService.UpdateProduct(product_id, name, price, res.locals.user.id);

            res.status(200).json(updatedProduct)
        }
        catch (error) {
            next(error);
        }
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
