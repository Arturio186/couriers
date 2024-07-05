import db from "../Database/db";

import IBranch from "../Interfaces/Branch/IBranch";
import IBranchModel from "../Interfaces/Branch/IBranchModel";
import IBranchStaff from "../Interfaces/Branch/IBranchStaff";

class BranchModel implements IBranchModel {
    private readonly tableName = "branches";
    private readonly cityTableName = "cities"
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
            .join(this.cityTableName, `${this.cityTableName}.id`, '=', `${this.tableName}.city_id`)
            .where(conditions)
            .select(`${this.tableName}.*`, `${this.cityTableName}.name as city_name`, `${this.cityTableName}.region as region`)
            .orderBy("created_at", "desc");
    }

    public FindOne = async (conditions: Partial<IBranch>): Promise<IBranch | undefined> => {
        return db(this.tableName).where(conditions).first();
    }

    public GetUserBranches = async (userID: string) => {
        return db(this.staffTableName)
            .join(this.tableName, `${this.staffTableName}.branch_id`, '=', `${this.tableName}.id`)
            .where({ user_id: userID })
            .select(`${this.staffTableName}.*`, `${this.tableName}.name as branch_name`)
    }
}

export default new BranchModel();