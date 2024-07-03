import APIError from "../Exceptions/APIError";

import IProductService from "../Interfaces/Product/IProductService";

import IProductModel from "../Interfaces/Product/IProductModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import ICategoryModel from "../Interfaces/Category/ICategoryModel";
import ProductDTO from "../DTO/ProductDTO";

class ProductService implements IProductService {
    private readonly ProductModel: IProductModel;
    private readonly CategoryModel: ICategoryModel;
    private readonly BusinessModel: IBusinessModel;

    constructor(productModel: IProductModel, categoryModel: ICategoryModel, businessModel: IBusinessModel) {
        this.ProductModel = productModel;
        this.CategoryModel = categoryModel;
        this.BusinessModel = businessModel;
    }

    public GetProducts = async (categoryID: string, userID: string) => {
        const category = await this.CategoryModel.FindOne({ id: categoryID })

        if (!category) {
            throw APIError.BadRequest("Категория не найдена");
        }

        const business = await this.BusinessModel.FindOne({ id: category.business_id })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        if (business.owner_id !== userID) {
            const staffRow = await this.BusinessModel.FindUserInStaffs(userID)

            if (!staffRow) {
                throw APIError.Forbidden("Нет доступа к бизнесу");
            }
        }

        const products = (
            await this.ProductModel.FindAll({ category_id: category.id })
        ).map(product => new ProductDTO(product))
        
        return products
    };
}

export default ProductService;
