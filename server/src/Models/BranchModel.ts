import db from "../Database/db";

import IBranch from "../Interfaces/Branch/IBranch";
import IBranchModel from "../Interfaces/Branch/IBranchModel";

class BranchModel implements IBranchModel {
    private readonly tableName = "branches";
    private readonly businessesTableName = "businesses"
    private readonly citiesTableName = "cities"
    private readonly staffTableName = "branch_user"

    public Create = async (branch: IBranch): Promise<IBranch> => {
        const [newBranch] = await db(this.tableName).insert(branch).returning<IBranch[]>("*");

        return newBranch;
    };

    public Update = async (conditions: Partial<IBranch>, data: Partial<IBranch>) => {
        const [updatedBranch] = await db(this.tableName)
            .where(conditions)
            .update({
                ...data,
                updated_at: db.fn.now()
            })
            .returning<IBranch[]>('*');

        return updatedBranch;
    }

    public Delete = async (conditions: Partial<IBranch>) => {
        return db(this.tableName).where(conditions).del();
    }

    public FindAll = async (conditions: Partial<IBranch>) : Promise<IBranch[] | undefined> => {
        return db(this.tableName)
            .join(this.citiesTableName, `${this.citiesTableName}.id`, '=', `${this.tableName}.city_id`)
            .where(conditions)
            .select(`${this.tableName}.*`, `${this.citiesTableName}.name as city_name`, `${this.citiesTableName}.region as region`)
            .orderBy("created_at", "desc");
    }

    public FindOne = async (conditions: Partial<IBranch>): Promise<IBranch | undefined> => {
        return db(this.tableName).where(conditions).first();
    }

    public GetUserBranches = async (userID: string) => {
        return db(this.staffTableName)
            .join(this.tableName, `${this.staffTableName}.branch_id`, '=', `${this.tableName}.id`)
            .join(this.citiesTableName, `${this.tableName}.city_id`, '=', `${this.citiesTableName}.id`)
            .join(this.businessesTableName, `${this.tableName}.business_id`, '=', `${this.businessesTableName}.id`)
            .where({ user_id: userID })
            .select(
                `${this.staffTableName}.*`,
                `${this.tableName}.name as branch_name`,
                `${this.businessesTableName}.id as business_id`,
                `${this.businessesTableName}.name as business_name`,
                `${this.citiesTableName}.coords as city_coords` 
            )
    }
}

export default new BranchModel();