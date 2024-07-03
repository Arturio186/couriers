import db from "../Database/db";

import IProduct from "../Interfaces/Product/IProduct";
import IProductModel from "../Interfaces/Product/IProductModel";

class ProductModel implements IProductModel {
    private readonly tableName = "products";
    private readonly categoriesTableName = "categories"

    public Create = async (product: IProduct): Promise<IProduct> => {
        const [newProduct] = await db(this.tableName).insert(product).returning<IProduct[]>("*");

        return newProduct;
    }

    public Update = async (conditions: Partial<IProduct>, data: Partial<IProduct>) => {
        const [updatedProduct] = await db(this.tableName)
            .where(conditions)
            .update({
                ...data,
                updated_at: db.fn.now()
            })
            .returning<IProduct[]>('*');

        return updatedProduct;
    };

    public Delete = async (conditions: Partial<IProduct>) => {
        return db(this.tableName).where(conditions).del();
    };

    public FindOne = async (conditions: Partial<IProduct>) => {
        return db(this.tableName).where(conditions).first();
    };
  
    public FindAll = async (conditions: Partial<IProduct>): Promise<IProduct[]> => {
        const products = await db(this.tableName)
            .where(conditions)
            .orderBy("created_at", "desc");

        return products;
    };
}

export default new ProductModel();