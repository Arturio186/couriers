import db from "../Database/db";

import ICategory from "../Interfaces/Category/ICategory";
import ICategoryModel from "../Interfaces/Category/ICategoryModel";

class CategoryModel implements ICategoryModel {
    private readonly tableName = "categories";
  
    public FindCategoriesWithOffset = async (business_id: string, page: number, limit: number): Promise<ICategory[]> => {
        const offset = (page - 1) * limit;

        const categories = await db(this.tableName)
            .select<ICategory[]>('*')
            .where({ business_id })
            .limit(limit)
            .offset(offset);

        return categories;
    };

    public GetMaxPages = async (business_id: string, limit: number): Promise<number> => {
        const totalCount = await db(this.tableName)
                .count('* as total')
                .where({ business_id })
                .first();

        const totalRecords = totalCount.total;
        const maxPages = Math.ceil(Number(totalRecords) / limit);

        return maxPages;
    };
}

export default new CategoryModel();