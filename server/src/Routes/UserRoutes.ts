import { Router } from "express";
import IUserController from "../Controllers/IUserController";

export default (UserController: IUserController) => {
    const router = Router();

    router.post("/registration", UserController.registration);
    router.post("/login", UserController.login);
    router.post("/logout", UserController.logout);
    router.get("/activate/:link", UserController.activate);
    router.get("/refresh", UserController.refresh);
    router.get("/users", UserController.getUsers);

    return router;
};
