import db from "../Database/db";

import IOrder from "../Interfaces/Order/IOrder";
import IOrderModel from "../Interfaces/Order/IOrderModel";

class OrderModel implements IOrderModel {
    private readonly tableName = "orders";
    private readonly orderStatusesTableName = "order_statuses";

    public FindActiveOrders = async (branchID: string): Promise<IOrder[]> => {
        const orders = await db(this.tableName)
            .join(this.orderStatusesTableName, `${this.tableName}.status_id`, `${this.orderStatusesTableName}.id`)
            .select(`${this.tableName}.*`, `${this.orderStatusesTableName}.name as status`)
            .where(`${this.tableName}.branch_id`, branchID)
            .whereIn(`${this.orderStatusesTableName}.name`, ['free', 'progress'])
            .orderBy(`${this.tableName}.created_at`, 'desc');

        return orders;
    };
}

export default new OrderModel();
