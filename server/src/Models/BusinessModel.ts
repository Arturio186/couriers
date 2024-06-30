import db from "../Database/db";

import IBusiness from "../Interfaces/Business/IBusiness";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";

class BusinessModel implements IBusinessModel {
    private readonly tableName = "businesses";
    private readonly branchTableName = "branches";

    public Create = async (buisness: IBusiness): Promise<IBusiness> => {
        const [newBusiness] = await db(this.tableName).insert(buisness).returning<IBusiness[]>("*");

        return newBusiness;
    };

    public Update = async (conditions: Partial<IBusiness>, data: Partial<IBusiness>) => {
        const [updatedBusiness] = await db(this.tableName)
            .where(conditions)
            .update({
                ...data,
                updated_at: db.fn.now()
            })
            .returning<IBusiness[]>('*');

        return updatedBusiness;
    }

    public Delete = async (conditions: Partial<IBusiness>) => {
        return db(this.tableName).where(conditions).del();
    }

    public FindAll = async (conditions: Partial<IBusiness>) : Promise<IBusiness[] | undefined> => {
        return db(this.tableName).where(conditions).orderBy("created_at", "desc");
    }

    public FindOne = async (conditions: Partial<IBusiness>): Promise<IBusiness | undefined> => {
        return db(this.tableName).where(conditions).first();
    }
}

export default new BusinessModel();