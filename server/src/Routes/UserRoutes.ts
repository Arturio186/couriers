import { Router } from "express";
import IUserController from "../Interfaces/IUserController";

export default (userController: IUserController) => {
    const router = Router();

    router.post("/registration", userController.Registration);
    router.post("/login", userController.Login);
    router.post("/logout", userController.Logout);
    router.get("/activate/:link", userController.Activate);
    router.get("/refresh", userController.Refresh);
    router.get("/users", userController.GetUsers);

    return router;
};
