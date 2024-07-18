import db from "../Database/db";

import IBusiness from "../Interfaces/Business/IBusiness";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";

import IBranchSales from "../Interfaces/Branch/IBranchSales";
import IBusinessesStats from "../Interfaces/Business/IBusinessesStats";
import IDailyOrders from "../Interfaces/Order/IDailyOrders";

class BusinessModel implements IBusinessModel {
    private readonly tableName = "businesses";
    private readonly branchesTableName = "branches";
    private readonly staffTable = "branch_user"
    private readonly productOrderTableName = "product_order";
    private readonly ordersTableName = "orders"

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

    public FindUserInStaffs = async (userID: string, businessID: string): Promise<{ branch_id: string; user_id: string; business_id: string; } | undefined> => {
        return db(this.staffTable)
            .join(this.branchesTableName, `${this.staffTable}.branch_id`, '=', `${this.branchesTableName}.id`)
            .where({ user_id: userID, business_id: businessID })
            .select(`${this.staffTable}.*`, `${this.branchesTableName}.business_id as business_id`)
            .first()
    };

    public async GetBranchSalesByBusinessID(businessID: string): Promise<IBranchSales[]> {
        const branchSales = await db(this.ordersTableName)
            .join(this.branchesTableName, `${this.ordersTableName}.branch_id`, "=", `${this.branchesTableName}.id`)
            .join(this.productOrderTableName, `${this.ordersTableName}.id`, "=", `${this.productOrderTableName}.order_id`)
            .select<IBranchSales[]>(
                `${this.branchesTableName}.name as branch_name`,
                db.raw(`SUM(${this.productOrderTableName}.quantity * ${this.productOrderTableName}.product_price) as total_money`),
                db.raw(`COUNT(${this.ordersTableName}.id) as total_sales`),
                db.raw(`COUNT(DISTINCT ${this.ordersTableName}.id) as total_orders`)
            )
            .where(`${this.branchesTableName}.business_id`, businessID)
            .groupBy(`${this.branchesTableName}.name`);

        return branchSales;
    }

    public async GetBusinessesStatsByOwnerID(ownerID: string): Promise<IBusinessesStats> {
        const [businessStats] = await db(this.tableName)
            .join(this.branchesTableName, `${this.tableName}.id`, "=", `${this.branchesTableName}.business_id`)
            .join(this.ordersTableName, `${this.branchesTableName}.id`, "=", `${this.ordersTableName}.branch_id`)
            .join(this.productOrderTableName, `${this.ordersTableName}.id`, "=", `${this.productOrderTableName}.order_id`)
            .select<IBusinessesStats[]>(
                db.raw(`SUM(${this.productOrderTableName}.quantity * ${this.productOrderTableName}.product_price) AS total_money`),
                db.raw(`COUNT(distinct ${this.ordersTableName}.id) AS total_orders`)
            )
            .where(`${this.tableName}.owner_id`, ownerID)
            .groupBy(`${this.tableName}.owner_id`);

        return businessStats;
    }
}

export default BusinessModel;