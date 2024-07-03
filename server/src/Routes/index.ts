import { Router } from "express";
import container from "../container";

import UserRoutes from "./UserRoutes";
import BusinessRoutes from "./BusinessRoutes";
import BranchRoutes from "./BranchRoutes";
import CityRoutes from "./CityRoutes";
import CategoryRoutes from "./CategoryRoutes";
import ProductRoutes from "./ProductRoutes";

const router = Router()

router.use('/user', UserRoutes(container.userController))
router.use('/businesses', BusinessRoutes(container.businessController))
router.use('/branches', BranchRoutes(container.branchController))
router.use('/citites', CityRoutes(container.cityController))
router.use('/categories', CategoryRoutes(container.categoryController))
router.use('/products', ProductRoutes(container.productController))

export default router;