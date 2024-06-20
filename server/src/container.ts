import UserModel from "./Models/UserModel";
import UserController from "./Controllers/UserController";
import UserService from "./Services/UserService";

import RefreshSessionService from "./Services/RefreshSessionService";
import RefreshSessionModel from "./Models/RefreshSessionModel";

const refreshSessionService = new RefreshSessionService(RefreshSessionModel)

const userService = new UserService(UserModel, refreshSessionService)
const userController = new UserController(userService)

const container = {
    userController,
}

export default container;
