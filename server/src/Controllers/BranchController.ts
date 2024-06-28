import { Request, Response, NextFunction } from "express";

import IBranchController from "../Interfaces/Branch/IBranchController";
import IBranchService from "../Interfaces/Branch/IBranchService";

class BranchController implements IBranchController {
    private readonly BranchService: IBranchService

    constructor(branchService: IBranchService) {
        this.BranchService = branchService
    }

    public GetByBusiness = async (req: Request, res: Response, next: NextFunction) => {
        try {
            

        }
        catch (error) {
            next(error)
        }
    }
}

export default BranchController;