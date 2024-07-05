import { Router } from "express";
import { body, query } from "express-validator";

import IUserController from "../Interfaces/User/IUserController";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

export default (userController: IUserController) => {
    const router = Router();

    router.post(
        "/registration",
        body("name").notEmpty(),
        body("email").notEmpty().isEmail(),
        body("password").notEmpty().isLength({ min: 6, max: 32 }),
        body("role").notEmpty(),
        ValidationMiddleware,
        userController.Registration
    );
    router.get(
        "/activate",
        query("link").notEmpty(),
        ValidationMiddleware,
        userController.Activate
    );

    router.post(
        "/login",
        body("email").notEmpty().isEmail(),
        body("password").isLength({ min: 6, max: 32 }),
        ValidationMiddleware,
        userController.Login
    );

    router.post("/logout", userController.Logout);
    router.get("/refresh", userController.Refresh);

    router.get(
        "/",
        AuthMiddleware,
        userController.Profile
    )

    router.patch("/edit-profile",
        AuthMiddleware,
        body("first_name").notEmpty().isLength({ max: 50 }),
        body("last_name").isLength({ max: 50 }),
        body("email").isEmail(),
        ValidationMiddleware,
        userController.Edit
    )

    return router;
};
