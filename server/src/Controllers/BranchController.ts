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
            const { business_id } = req.query

            const branches = await this.BranchService.GetBranchesByBusinessID(business_id.toString(), res.locals.user.id);

            res.status(200).json(branches)
        }
        catch (error) {
            next(error)
        }
    }

    public Store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, business_id, city_id } = req.body;

            const branch = await this.BranchService.SaveBranch(name, business_id, city_id, res.locals.user.id)

            res.status(200).json(branch)
        }
        catch (error) {
            next(error)
        }
    }

    public Destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { business_id, branch_id } = req.body;

            await this.BranchService.RemoveBranch(business_id, branch_id, res.locals.user.id)

            res.status(200).json({message: "Success"})
        }
        catch (error) {
            next(error)
        }
    }
}

export default BranchController;