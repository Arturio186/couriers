import db from "../Database/db";

import IOrder from "../Interfaces/Order/IOrder";
import IOrderModel from "../Interfaces/Order/IOrderModel";
import IOrderData from "../Interfaces/Order/IOrderData";
import IOrderProduct from "../Interfaces/Order/IOrderProduct";

class OrderModel implements IOrderModel {
    private readonly tableName = "orders";
    private readonly orderStatusesTableName = "order_statuses";
    private readonly productOrderTableName = "product_order";

    public FindActiveOrders = async (branchID: string): Promise<IOrder[]> => {
        const orders = await db(this.tableName)
            .join(this.orderStatusesTableName, `${this.tableName}.status_id`, `${this.orderStatusesTableName}.id`)
            .select(`${this.tableName}.*`, `${this.orderStatusesTableName}.name as status`)
            .where(`${this.tableName}.branch_id`, branchID)
            .whereIn(`${this.orderStatusesTableName}.name`, ['free', 'progress'])
            .orderBy(`${this.tableName}.created_at`, 'desc');

        return orders;
    };

    public Create = async (data: IOrderData): Promise<IOrder> => {
        const [newOrder] = await db(this.tableName)
            .insert({
                status_id: data.status_id,
                address: data.address,
                note: data.note,
                coords: db.raw(`ST_GeomFromText('POINT(${data.lat} ${data.long})', 4326)`),
                client_id: data.client_id,
                delivery_time: data.delivery_time,
                courier_id: data.courier_id,
                branch_id: data.branch_id
            })   
            .returning<IOrder[]>("*")

        return newOrder;
    }

    public async AddProductsToOrder(orderID: string, products: IOrderProduct[]): Promise<void> {
        const productOrders = products.map(product => ({
            order_id: orderID,
            product_id: product.id,
            quantity: product.quantity,
            product_price: product.price
        }));

        await db(this.productOrderTableName).insert(productOrders);
    }
}

export default new OrderModel();
