import { Router } from "express";
import { body } from "express-validator";

import IUserController from "../Interfaces/IUserController";

export default (userController: IUserController) => {
    const router = Router();

    router.post(
        "/registration",
            body("name").notEmpty(),
            body("email").isEmail(),
            body("password").isLength({ min: 6, max: 32 }),
            body("role").notEmpty(),
        userController.Registration
    );
    router.post("/login", userController.Login);
    router.post("/logout", userController.Logout);
    router.get("/activate/:link", userController.Activate);
    router.get("/refresh", userController.Refresh);
    router.get("/users", userController.GetUsers);

    return router;
};
