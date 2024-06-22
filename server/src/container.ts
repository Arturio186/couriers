import UserModel from "./Models/UserModel";
import UserController from "./Controllers/UserController";
import UserService from "./Services/UserService";

import RefreshSessionService from "./Services/RefreshSessionService";
import RefreshSessionModel from "./Models/RefreshSessionModel";
import RoleService from "./Services/RoleService";
import RoleModel from "./Models/RoleModel";

const refreshSessionService = new RefreshSessionService(RefreshSessionModel)
const roleService = new RoleService(RoleModel)

const userService = new UserService(UserModel, refreshSessionService, roleService)
const userController = new UserController(userService)

const container = {
    userController,
}

export default container;
