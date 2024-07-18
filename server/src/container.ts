import UserModel from "./Models/UserModel";
import UserService from "./Services/UserService";
import UserController from "./Controllers/UserController";

import RefreshSessionModel from "./Models/RefreshSessionModel";
import RefreshSessionService from "./Services/RefreshSessionService";

import RoleModel from "./Models/RoleModel";
import RoleService from "./Services/RoleService";

import BusinessModel from "./Models/BusinessModel";
import BusinessService from "./Services/BusinessService";
import BusinessController from "./Controllers/BusinessController";

import BranchModel from "./Models/BranchModel";
import BranchService from "./Services/BranchService";
import BranchController from "./Controllers/BranchController";

import CityModel from "./Models/CityModel";
import CityService from "./Services/CityService";
import CityController from "./Controllers/CityController";

import CategoryService from "./Services/CategoryService";
import CategoryModel from "./Models/CategoryModel";
import CategoryController from "./Controllers/CategoryController";

import ProductService from "./Services/ProductService";
import ProductModel from "./Models/ProductModel";
import ProductController from "./Controllers/ProductController";

import OrderService from "./Services/OrderService";
import OrderModel from "./Models/OrderModel";
import OrderController from "./Controllers/OrderController";

import ClientModel from "./Models/ClientModel";
import OrderStatusModel from "./Models/OrderStatusModel";

const refreshSessionModel = new RefreshSessionModel()
const refreshSessionService = new RefreshSessionService(refreshSessionModel)

const roleModel = new RoleModel()
const roleService = new RoleService(roleModel)

const cityModel = new CityModel()
const cityService = new CityService(cityModel)
const cityController = new CityController(cityService)

const userModel = new UserModel()
const userService = new UserService(userModel, refreshSessionService, roleService)
const userController = new UserController(userService)

const businessModel = new BusinessModel()
const businessService = new BusinessService(businessModel)
const businessController = new BusinessController(businessService)

const branchModel = new BranchModel()
const branchService = new BranchService(branchModel, businessService, cityService)
const branchController = new BranchController(branchService)

const categoryModel = new CategoryModel()
const categoryService = new CategoryService(categoryModel, businessService)
const categoryController = new CategoryController(categoryService)

const productModel = new ProductModel()
const productService = new ProductService(productModel, categoryService, businessService)
const productController = new ProductController(productService)

const clientModel = new ClientModel()

const orderStatusModel = new OrderStatusModel()

const orderModel = new OrderModel()
const orderService = new OrderService(
    orderModel, 
    branchService, 
    productModel, 
    clientModel, 
    orderStatusModel,
    businessService
)
const orderController = new OrderController(orderService)

const container = {
    userController,
    businessController,
    branchController,
    cityController,
    categoryController,
    productController,
    orderController
}

export default container;
