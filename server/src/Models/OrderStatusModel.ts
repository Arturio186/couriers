import db from "../Database/db";

import IOrderStatus from "../Interfaces/OrderStatus/IOrderStatus";
import IOrderStatusModel from "../Interfaces/OrderStatus/IOrderStatusModel";

class OrderStatusModel implements IOrderStatusModel {
    public readonly tableName = "order_statuses";

    public FindOne = async (conditions: Partial<IOrderStatus>) => {
        return db(this.tableName).where(conditions).first();
    };
}

export default new OrderStatusModel();
