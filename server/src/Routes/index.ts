import { Router } from "express";
import container from "../container";

import UserRoutes from "./UserRoutes";
import BusinessRoutes from "./BusinessRoutes";

const router = Router()

router.use('/user', UserRoutes(container.userController))
router.use('/businesses', BusinessRoutes(container.businessController))

export default router;