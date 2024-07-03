import db from "../Database/db";

import ICategory from "../Interfaces/Category/ICategory";
import ICategoryModel from "../Interfaces/Category/ICategoryModel";

class CategoryModel implements ICategoryModel {
    private readonly tableName = "categories";

    public Create = async (category: ICategory): Promise<ICategory> => {
        const [newCategory] = await db(this.tableName).insert(category).returning<ICategory[]>("*");

        return newCategory;
    }

    public Update = async (conditions: Partial<ICategory>, data: Partial<ICategory>) => {
        const [updatedCategory] = await db(this.tableName)
            .where(conditions)
            .update({
                ...data,
                updated_at: db.fn.now()
            })
            .returning<ICategory[]>('*');

        return updatedCategory;
    };

    public Delete = async (conditions: Partial<ICategory>) => {
        return db(this.tableName).where(conditions).del();
    };

    public FindOne = async (conditions: Partial<ICategory>) => {
        return db(this.tableName).where(conditions).first();
    };
  
    public GetAll = async (business_id: string): Promise<ICategory[]> => {
        const categories = await db(this.tableName)
            .where({ business_id })

        return categories;
    };
}

export default new CategoryModel();