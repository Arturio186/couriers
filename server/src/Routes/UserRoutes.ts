import { Router } from "express";
import IUserController from "../Interfaces/IUserController";

export default (UserController: IUserController) => {
    const router = Router();

    router.post("/registration", UserController.Registration);
    router.post("/login", UserController.Login);
    router.post("/logout", UserController.Logout);
    router.get("/activate/:link", UserController.Activate);
    router.get("/refresh", UserController.Refresh);
    router.get("/users", UserController.GetUsers);

    return router;
};
