import OrderDTO from "../DTO/OrderDTO";
import APIError from "../Exceptions/APIError";

import IBranchService from "../Interfaces/Branch/IBranchService";
import IClientModel from "../Interfaces/Client/IClientModel";

import IOrder from "../Interfaces/Order/IOrder";
import IOrderData from "../Interfaces/Order/IOrderData";
import IOrderModel from "../Interfaces/Order/IOrderModel";
import IOrderProduct from "../Interfaces/Order/IOrderProduct";
import IOrderRequest from "../Interfaces/Order/IOrderRequest";
import IOrderService from "../Interfaces/Order/IOrderService";
import IOrderStatusModel from "../Interfaces/OrderStatus/IOrderStatusModel";
import IProductModel from "../Interfaces/Product/IProductModel";

class OrderService implements IOrderService {
    private readonly OrderModel: IOrderModel;
    private readonly BranchService: IBranchService;
    private readonly ProductModel: IProductModel;
    private readonly ClientModel: IClientModel;
    private readonly OrderStatusModel: IOrderStatusModel;

    constructor(
        orderModel: IOrderModel, 
        branchService: IBranchService, 
        productModel: IProductModel, 
        clientModel: IClientModel,
        orderStatusModel: IOrderStatusModel
    ) {
        this.OrderModel = orderModel;
        this.BranchService = branchService;
        this.ProductModel = productModel;
        this.ClientModel = clientModel;
        this.OrderStatusModel = orderStatusModel;
    }

    public GetActiveOrders = async (branchID: string, userID: string) => {
        const isUserInBranch = await this.BranchService.IsUserInBranch(branchID, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }

        const orders = await this.OrderModel.FindActiveOrders(branchID);

        return orders.map(o => new OrderDTO(o))
    };

    public SaveOrder = async (orderRequest: IOrderRequest, userID: string) => {
        const branch = await this.BranchService.FindBranch(orderRequest.branch_id)

        const isUserInBranch = await this.BranchService.IsUserInBranch(orderRequest.branch_id, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }

        const products = await this.GetValidateProducts(orderRequest.products, branch.business_id);

        const client = await this.ClientModel.FindOrCreate(
            { 
                name: orderRequest.client_name,
                phone: orderRequest.client_phone
            }, 
            branch.business_id
        )

        const orderStatus = await this.OrderStatusModel.FindOne({ id: orderRequest.status_id })

        if (!orderStatus) {
            throw APIError.BadRequest("Статус заказа не найден");
        }

        if (orderStatus.name !== "free" && !orderRequest.courier_id) {
            throw APIError.BadRequest("Необходимо выбрать курьера или поменять статус заказа");
        }

        if (orderStatus.name === "free") {
            orderRequest.courier_id = null;
        } else {
            const isCourierInBranch = await this.BranchService.IsUserInBranch(branch.id, orderRequest.courier_id)

            if (!isCourierInBranch) {
                throw APIError.BadRequest("Курьер не относится к данном филиалу");
            }
        }

        const deliveryDate = new Date(orderRequest.delivery_time);

        const orderData: IOrderData = {
            status_id: orderStatus.id,
            address: orderRequest.address,
            note: orderRequest.note ? orderRequest.note : null,
            lat: orderRequest.lat,
            long: orderRequest.long, 
            client_id: client.id,
            delivery_time: deliveryDate,
            courier_id: orderRequest.courier_id ? orderRequest.courier_id : null,
            branch_id: branch.id,
        }

        const order = await this.OrderModel.Create(orderData)

        await this.OrderModel.AddProductsToOrder(order.id, products);

        return order;
    }

    private GetValidateProducts = async (products: IOrderProduct[], businessID: string) => {
        const productIds = products.map(p => p.id);

        const productsFromDB = await this.ProductModel.GetProductsByIDs(productIds);

        if (productsFromDB.length !== products.length) {
            throw APIError.BadRequest("Некорректный список товаров");
        }

        const validatedProducts: IOrderProduct[] = products.map(product => {
            const dbProduct = productsFromDB.find(p => p.id === product.id);

            if (!dbProduct || dbProduct.business_id !== businessID) {
                throw APIError.BadRequest(`Продукт ${product.id} не относится к бизнесу`);
            }

            return {
                id: dbProduct.id,
                quantity: product.quantity,
                price: Number(dbProduct.price)
            };
        });

        return validatedProducts
    } 
}

export default OrderService;
