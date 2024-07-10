import db from "../Database/db";

import IBranch from "../Interfaces/Branch/IBranch";
import IBranchModel from "../Interfaces/Branch/IBranchModel";
import IBranchStaff from "../Interfaces/Branch/IBranchStaff";

class BranchModel implements IBranchModel {
    private readonly tableName = "branches";
    private readonly businessesTableName = "businesses"
    private readonly citiesTableName = "cities"
    private readonly staffTableName = "branch_user"
    private readonly usersTableName = "users"
    private readonly rolesTableName = "roles"

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

    public FindBrnachStaff = async (branchID: string, userID: string): Promise<IBranchStaff | undefined> => {
        return db(this.staffTableName)
            .where({ 
                user_id: userID,
                branch_id: branchID
            })
            .first()
    }

    public JoinBranch = async (branchID: string, userID: string): Promise<IBranchStaff> => {
        const [createdStaffRow] = await db(this.staffTableName)
            .insert({
                user_id: userID,
                branch_id: branchID
            })
            .returning<IBranchStaff[]>("*");
        
        return createdStaffRow;
    }

    public GetBranchInfo = async (branchID: string): Promise<IBranch> => {
        return db(this.tableName)
            .join(this.businessesTableName, `${this.tableName}.business_id`, '=', `${this.businessesTableName}.id`)
            .join(this.usersTableName, `${this.businessesTableName}.owner_id`, '=', `${this.usersTableName}.id`)
            .where(`${this.tableName}.id`, branchID)
            .select(
                `${this.tableName}.*`,
                `${this.businessesTableName}.name as business_name`,
                `${this.usersTableName}.first_name as owner_first_name`,
                `${this.usersTableName}.last_name as owner_last_name`,
            )
            .first()
    }

    public FindAllBranchStaffWithOffset = async (branchID: string, page: number, limit: number): Promise<IBranchStaff[]> => {
        const offset = (page - 1) * limit;

        return db(this.staffTableName)
            .join(this.usersTableName, `${this.staffTableName}.user_id`, '=', `${this.usersTableName}.id`)
            .join(this.rolesTableName, `${this.usersTableName}.role_id`, '=', `${this.rolesTableName}.id`)
            .where(`${this.staffTableName}.branch_id`, branchID)
            .select(
                `${this.staffTableName}.*`,
                `${this.usersTableName}.first_name as user_first_name`,
                `${this.usersTableName}.last_name as user_last_name`,
                `${this.usersTableName}.email as user_email`,
                `${this.rolesTableName}.name as user_role` 
            )
            .limit(limit)
            .offset(offset);
    }

    public GetMaxStaffPages = async (branchID: string, limit: number): Promise<number> => {
        const totalCount = await db(this.staffTableName)
                .count('* as total')
                .where({ branch_id: branchID })
                .first();

        const totalRecords = totalCount.total;
        const maxPages = Math.ceil(Number(totalRecords) / limit);

        return maxPages;
    }

    public DeleteStaff = async (conditions: Pick<IBranchStaff, "branch_id" | "user_id">) => {
        return db(this.staffTableName).where(conditions).del();
    };
}

export default new BranchModel();