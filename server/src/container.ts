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

const refreshSessionService = new RefreshSessionService(RefreshSessionModel)
const roleService = new RoleService(RoleModel)

const userService = new UserService(UserModel, refreshSessionService, roleService)
const userController = new UserController(userService)

const branchService = new BranchService(BranchModel, BusinessModel, CityModel)
const branchController = new BranchController(branchService)

const businessService = new BusinessService(BusinessModel, UserModel, branchService)
const businessController = new BusinessController(businessService)

const cityService = new CityService(CityModel)
const cityController = new CityController(cityService)


const container = {
    userController,
    businessController,
    branchController,
    cityController
}

export default container;
