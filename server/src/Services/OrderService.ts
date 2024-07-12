import APIError from "../Exceptions/APIError";

import IBranchService from "../Interfaces/Branch/IBranchService";

import IOrder from "../Interfaces/Order/IOrder";
import IOrderModel from "../Interfaces/Order/IOrderModel";
import IOrderProduct from "../Interfaces/Order/IOrderProduct";
import IOrderRequest from "../Interfaces/Order/IOrderRequest";
import IOrderService from "../Interfaces/Order/IOrderService";
import IProductModel from "../Interfaces/Product/IProductModel";

class OrderService implements IOrderService {
    private readonly OrderModel: IOrderModel;
    private readonly BranchService: IBranchService;
    private readonly ProductModel: IProductModel;

    constructor(orderModel: IOrderModel, branchService: IBranchService, productModel: IProductModel) {
        this.OrderModel = orderModel;
        this.BranchService = branchService;
        this.ProductModel = productModel;
    }

    public GetActiveOrders = async (branchID: string, userID: string) => {
        const isUserInBranch = await this.BranchService.IsUserInBranch(branchID, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }

        return await this.OrderModel.FindActiveOrders(branchID)
    };

    public SaveOrder = async (orderRequest: IOrderRequest, userID: string) => {
        const branch = await this.BranchService.FindBranch(orderRequest.branch_id)

        const isUserInBranch = await this.BranchService.IsUserInBranch(orderRequest.branch_id, userID)

        if (!isUserInBranch) {
            throw APIError.BadRequest("Вы не являетесь работником данного филиала");
        }

        await this.validateProducts(orderRequest.products, branch.business_id);

        return await { } as IOrder
    }

    private validateProducts = async (products: IOrderProduct[], businessID: string) => {
        const productIds = products.map(p => p.id);

        const dbProducts = await this.ProductModel.GetProductsByIDs(productIds);

        console.log(dbProducts)

        if (dbProducts.length !== products.length) {
            throw APIError.BadRequest("Некоторые товары не найдены");
        }
        
        /*

        dbProducts.forEach(product => {
            if (product.branch_id !== branchId) {
                throw APIError.BadRequest(`Продукт ${product.id} не относится к указанному филиалу`);
            }
        });
        */
    } 

}

export default OrderService;
