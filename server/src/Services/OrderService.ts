import APIError from "../Exceptions/APIError";

import IOrderModel from "../Interfaces/Order/IOrderModel";
import IOrderService from "../Interfaces/Order/IOrderService";

class OrderService implements IOrderService {
    private readonly OrderModel: IOrderModel;

    constructor(orderModel: IOrderModel) {
        this.OrderModel = orderModel;
    }

    public GetActiveOrders = async (branchID: string) => {
        // Добавить проверки что юзер относится к бранчу

        return await this.OrderModel.FindActiveOrders(branchID)
    };

}

export default OrderService;
