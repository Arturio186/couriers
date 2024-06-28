import db from "../Database/db";

import IBranch from "../Interfaces/Branch/IBranch";
import IBranchModel from "../Interfaces/Branch/IBranchModel";

class BranchModel implements IBranchModel {
    private readonly tableName = "branches";

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
        return db(this.tableName).where(conditions).orderBy("created_at", "desc");
    }

    public FindOne = async (conditions: Partial<IBranch>): Promise<IBranch | undefined> => {
        return db(this.tableName).where(conditions).first();
    }
}

export default new BranchModel();