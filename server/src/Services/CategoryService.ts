import APIError from "../Exceptions/APIError";

import ICategoryService from "../Interfaces/Category/ICategoryService";
import ICategoryModel from "../Interfaces/Category/ICategoryModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";

import ICategory from "../Interfaces/Category/ICategory";

import CategoryDTO from "../DTO/CategoryDTO";

class CategoryService implements ICategoryService {
    private readonly CategoryModel: ICategoryModel;
    private readonly BusinessModel: IBusinessModel;

    constructor(categoryModel: ICategoryModel, businessModel: IBusinessModel) {
        this.CategoryModel = categoryModel;
        this.BusinessModel = businessModel;
    }

    public SaveCategory = async (businessID: string, name: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const createdCategory = await this.CategoryModel.Create({
            name: name,
            business_id: businessID
        })

        return new CategoryDTO(createdCategory)
    };

    public UpdateCategory = async (categoryID: string, name: string, userID: string) => {
        const category = await this.CategoryModel.FindOne({ id: categoryID })

        if (!category) {
            throw APIError.BadRequest("Категория не найдена");
        }

        const business = await this.BusinessModel.FindOne({ id: category.business_id, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const updatedCategory = await this.CategoryModel.Update({ id: categoryID }, { name })

        return new CategoryDTO(updatedCategory)
    };

    public RemoveCategory = async (categoryID: string, userID: string) => {
        const category = await this.CategoryModel.FindOne({ id: categoryID })

        if (!category) {
            throw APIError.BadRequest("Категория не найдена");
        }

        const business = await this.BusinessModel.FindOne({ id: category.business_id, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        return await this.CategoryModel.Delete({ id: categoryID })
    };

    public GetCategories = async (businessID: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        if (business.owner_id !== userID) {
            const staffRow = await this.BusinessModel.FindUserInStaffs(userID)

            if (!staffRow) {
                throw APIError.Forbidden("Нет доступа к бизнесу");
            }
        }

        const categories = (
            await this.CategoryModel.FindAll({ business_id: businessID })
        ).map(category => new CategoryDTO(category))
        
        return categories
    };

    public FindCategory = async (categoryID: string): Promise<ICategory> => {
        const category = await this.CategoryModel.FindOne({ id: categoryID })

        if (!category) {
            throw APIError.BadRequest("Категория не найдена");
        }

        return category;
    }
}

export default CategoryService;
