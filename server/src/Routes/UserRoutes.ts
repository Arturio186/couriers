import { Router } from "express";
import { body, param } from "express-validator";

import IUserController from "../Interfaces/User/IUserController";

export default (userController: IUserController) => {
    const router = Router();

    router.post(
        "/registration",
        body("name").notEmpty(),
        body("email").notEmpty().isEmail(),
        body("password").notEmpty().isLength({ min: 6, max: 32 }),
        body("role").notEmpty(),
        userController.Registration
    );
    router.get(
        "/activate/:link",
        param("link").notEmpty(),
        userController.Activate
    );

    router.post(
        "/login",
        body("email").notEmpty().isEmail(),
        body("password").isLength({ min: 6, max: 32 }),
        userController.Login
    );

    router.post("/logout", userController.Logout);
    router.get("/refresh", userController.Refresh);
    // router.get("/users", AuthMiddleware, userController.GetUsers);

    return router;
};
