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

const refreshSessionService = new RefreshSessionService(RefreshSessionModel)
const roleService = new RoleService(RoleModel)

const userService = new UserService(UserModel, refreshSessionService, roleService)
const userController = new UserController(userService)

const businessService = new BusinessService(BusinessModel, UserModel)
const businessController = new BusinessController(businessService)

const branchService = new BranchService(BranchModel, BusinessModel)
const branchController = new BranchController(branchService)


const container = {
    userController,
    businessController,
    branchController
}

export default container;
