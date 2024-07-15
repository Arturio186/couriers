import db from "../Database/db";

import IOrder from "../Interfaces/Order/IOrder";
import IOrderModel from "../Interfaces/Order/IOrderModel";
import IOrderData from "../Interfaces/Order/IOrderData";
import IOrderProduct from "../Interfaces/Order/IOrderProduct";

class OrderModel implements IOrderModel {
    private readonly usersTableName = "users";
    private readonly tableName = "orders";
    private readonly orderStatusesTableName = "order_statuses";
    private readonly productOrderTableName = "product_order";
    private readonly productsTableName = "products"
    private readonly clientTableName = "clients"

    public FindOne = async (conditions: Partial<IOrder>) => {
        return db(this.tableName).where(conditions).first();
    }

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

    public FindActiveOrders = async (branchID: string): Promise<IOrder[]> => {
        const orders = await db(this.tableName)
            .join(this.orderStatusesTableName, `${this.tableName}.status_id`, '=', `${this.orderStatusesTableName}.id`)
            .join(this.clientTableName, `${this.tableName}.client_id`, '=', `${this.clientTableName}.id`)
            .leftJoin(this.usersTableName, `${this.usersTableName}.id`, '=', `${this.tableName}.courier_id`)
            .select(
                `${this.tableName}.*`, 
                `${this.orderStatusesTableName}.name as status`, 
                `${this.clientTableName}.name as client_name`,
                `${this.clientTableName}.phone as client_phone`,
                `${this.usersTableName}.first_name as courier_first_name`,
                `${this.usersTableName}.last_name as courier_last_name`,
            )
            .where(`${this.tableName}.branch_id`, branchID)
            .whereIn(`${this.orderStatusesTableName}.name`, ['free', 'progress'])
            .orderBy(`${this.tableName}.created_at`, 'desc');

        return orders;
    };

    public async AddProductsToOrder(orderID: string, products: Omit<IOrderProduct, 'order_id'>[]): Promise<void> {
        const productOrders = products.map(product => ({
            order_id: orderID,
            product_id: product.product_id,
            quantity: product.quantity,
            product_price: product.price
        }));

        await db(this.productOrderTableName).insert(productOrders);
    }

    public async GetOrderProducts(orderID: string): Promise<IOrderProduct[]> {
        const products = await db(this.productOrderTableName)
            .join(this.productsTableName, `${this.productsTableName}.id`, '=', `${this.productOrderTableName}.product_id`)
            .where({ order_id: orderID })
            .select(`${this.productOrderTableName}.*`, `${this.productsTableName}.name`)

        return products;
    }
}

export default new OrderModel();
