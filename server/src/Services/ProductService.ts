import APIError from "../Exceptions/APIError";

import IProductService from "../Interfaces/Product/IProductService";

import IProductModel from "../Interfaces/Product/IProductModel";
import ICategoryService from "../Interfaces/Category/ICategoryService";
import IBusinessService from "../Interfaces/Business/IBusinessService";

import ProductDTO from "../DTO/ProductDTO";

class ProductService implements IProductService {
    private readonly ProductModel: IProductModel;
    private readonly CategoryService: ICategoryService;
    private readonly BusinessService: IBusinessService;

    constructor(productModel: IProductModel, categoryService: ICategoryService, businessService: IBusinessService) {
        this.ProductModel = productModel;
        this.CategoryService = categoryService;
        this.BusinessService = businessService;
    }

    public FindProduct = async (productID: string) => {
        const product = await this.ProductModel.FindOne({ id: productID })

        if (!product) {
            throw APIError.BadRequest("Продукт не найден");
        }

        return product;
    }

    public SaveProduct = async (categoryID: string, name: string, price: number, userID: string) => {
        const category = await this.CategoryService.FindCategory(categoryID);

        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(category.business_id, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const createdProduct = await this.ProductModel.Create({
            name,
            price,
            category_id: category.id
        })

        return new ProductDTO(createdProduct);
    }

    public UpdateProduct = async (productID: string, name: string, price: number, userID: string) => {
        const product = await this.FindProduct(productID)

        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(product.business_id, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const updatedProduct = await this.ProductModel.Update({ id: product.id }, { name, price })

        return new ProductDTO(updatedProduct);
    }

    public RemoveProduct = async (productID: string, userID: string) => {
        const product = await this.FindProduct(productID)

        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(product.business_id, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        return await this.ProductModel.Delete({ id: product.id })
    }

    public GetProducts = async (categoryID: string, userID: string) => {
        const category = await this.CategoryService.FindCategory(categoryID)

        const isCorrectStaff = await this.BusinessService.IsUserWorkInBusiness(category.business_id, userID)

        if (!isCorrectStaff) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const products = (
            await this.ProductModel.FindAll({ category_id: category.id })
        ).map(product => new ProductDTO(product))
        
        return products
    };
}

export default ProductService;
