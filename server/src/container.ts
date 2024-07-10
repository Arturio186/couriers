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

const refreshSessionService = new RefreshSessionService(RefreshSessionModel)
const roleService = new RoleService(RoleModel)

const cityService = new CityService(CityModel)
const cityController = new CityController(cityService)

const userService = new UserService(UserModel, refreshSessionService, roleService)
const userController = new UserController(userService)

const businessService = new BusinessService(BusinessModel)
const businessController = new BusinessController(businessService)

const branchService = new BranchService(BranchModel, businessService, cityService)
const branchController = new BranchController(branchService)

const categoryService = new CategoryService(CategoryModel, businessService)
const categoryController = new CategoryController(categoryService)

const productService = new ProductService(ProductModel, categoryService, businessService)
const productController = new ProductController(productService)

const orderService = new OrderService(OrderModel)
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
