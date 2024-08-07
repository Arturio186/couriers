import OrderDTO from "../DTO/OrderDTO";
import APIError from "../Exceptions/APIError";

import IBranchService from "../Interfaces/Branch/IBranchService";
import IBusinessService from "../Interfaces/Business/IBusinessService";
import IClientModel from "../Interfaces/Client/IClientModel";

import IOrderData from "../Interfaces/Order/IOrderData";
import IOrderModel from "../Interfaces/Order/IOrderModel";
import IOrderProductRequest from "../Interfaces/Order/IOrderProductRequest";
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
    private readonly BusinessService: IBusinessService;

    constructor(
        orderModel: IOrderModel, 
        branchService: IBranchService, 
        productModel: IProductModel, 
        clientModel: IClientModel,
        orderStatusModel: IOrderStatusModel,
        businessService: IBusinessService
    ) {
        this.OrderModel = orderModel;
        this.BranchService = branchService;
        this.ProductModel = productModel;
        this.ClientModel = clientModel;
        this.OrderStatusModel = orderStatusModel;
        this.BusinessService = businessService;
    }

    public FindOrder = async (orderID: string) => {
        const order = await this.OrderModel.FindOne({ id: orderID })

        if (!order) {
            throw APIError.BadRequest("Заказ не найден");
        }

        return order;
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
        const branch = await this.BranchService.FindBranch(orderRequest.branch_id);
    
        const isUserInBranch = await this.BranchService.IsUserInBranch(orderRequest.branch_id, userID);
    
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
        );
    
        let orderStatus;
    
        if (orderRequest.courier_id === null) {
            orderStatus = await this.OrderStatusModel.FindOne({ name: "free" });

            if (!orderStatus) {
                throw APIError.BadRequest("Статус заказа 'free' не найден");
            }
        } else {
            const isCourierInBranch = await this.BranchService.IsUserInBranch(branch.id, orderRequest.courier_id);
            
            if (!isCourierInBranch) {
                throw APIError.BadRequest("Курьер не относится к данному филиалу");
            }
            orderStatus = await this.OrderStatusModel.FindOne({ name: "progress" });

            if (!orderStatus) {
                throw APIError.BadRequest("Статус заказа 'progress' не найден");
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
        };
    
        const order = await this.OrderModel.CreateOrderWithProducts(orderData, products);

        return new OrderDTO(order);
    };
    

    private GetValidateProducts = async (products: IOrderProductRequest[], businessID: string) => {
        const productIds = products.map(p => p.id);

        const productsFromDB = await this.ProductModel.GetProductsByIDs(productIds);

        if (productsFromDB.length !== products.length) {
            throw APIError.BadRequest("Некорректный список товаров");
        }

        const validatedProducts = products.map(product => {
            const dbProduct = productsFromDB.find(p => p.id === product.id);

            if (!dbProduct || dbProduct.business_id !== businessID) {
                throw APIError.BadRequest(`Продукт ${product.id} не относится к бизнесу`);
            }

            return {
                product_id: product.id,
                quantity: product.quantity,
                price: Number(dbProduct.price)
            };
        });

        return validatedProducts
    } 

    public GetOrderProduct = async (orderID: string, userID: string) => {
        const order = await this.FindOrder(orderID)

        const branch = await this.BranchService.FindBranch(order.branch_id)

        const isUserInBranch = await this.BranchService.IsUserInBranch(branch.id, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }

        const products = await this.OrderModel.GetOrderProducts(order.id)

        return products;
    }

    public RemoveOrder = async (orderID: string, userID: string) => {
        const order = await this.FindOrder(orderID)

        const isUserInBranch = await this.BranchService.IsUserInBranch(order.branch_id, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }
        
        await this.OrderModel.Delete({ id: orderID })
    }

    public FinishOrder = async (orderID: string, userID: string) => {
        const order = await this.FindOrder(orderID)

        const isUserInBranch = await this.BranchService.IsUserInBranch(order.branch_id, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }

        const finishStatus = await this.OrderStatusModel.FindOne({ name: "delivered" });

        await this.OrderModel.Update({ id: orderID }, { status_id: finishStatus.id })
    }

    public GetLastTwoWeeksOrders = async (businessID: string, userID: string) => {
        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        return await this.OrderModel.GetDailyOrdersForBusiness(businessID);
    }
}

export default OrderService;
