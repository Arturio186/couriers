import { Router } from "express";
import container from "../container";

import UserRoutes from "./UserRoutes";

const router = Router()

router.use('/user', UserRoutes(container.userController))

export default router;