import APIError from "../Exceptions/APIError";

import ICategoryService from "../Interfaces/Category/ICategoryService";
import ICategoryModel from "../Interfaces/Category/ICategoryModel";

import ICategory from "../Interfaces/Category/ICategory";

import CategoryDTO from "../DTO/CategoryDTO";
import IBusinessService from "../Interfaces/Business/IBusinessService";

class CategoryService implements ICategoryService {
    private readonly CategoryModel: ICategoryModel;
    private readonly BusinessService: IBusinessService;

    constructor(categoryModel: ICategoryModel, businessService: IBusinessService) {
        this.CategoryModel = categoryModel;
        this.BusinessService = businessService;
    }

    public SaveCategory = async (businessID: string, name: string, userID: string) => {
        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const createdCategory = await this.CategoryModel.Create({
            name: name,
            business_id: businessID
        })

        return new CategoryDTO(createdCategory)
    };

    public UpdateCategory = async (categoryID: string, name: string, userID: string) => {
        const category = await this.FindCategory(categoryID)

        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(category.business_id, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const updatedCategory = await this.CategoryModel.Update({ id: categoryID }, { name })

        return new CategoryDTO(updatedCategory)
    };

    public RemoveCategory = async (categoryID: string, userID: string) => {
        const category = await this.FindCategory(categoryID)

        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(category.business_id, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        return await this.CategoryModel.Delete({ id: categoryID })
    };

    public GetCategories = async (businessID: string, userID: string) => {
        const isCorrectStaff = await this.BusinessService.IsUserWorkInBusiness(businessID, userID)

        if (!isCorrectStaff) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
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
