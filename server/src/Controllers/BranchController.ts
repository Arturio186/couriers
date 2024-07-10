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

    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, city_id } = req.body;
            const { branch_id } = req.params;

            const updatedBranch = await this.BranchService.UpdateBranch(branch_id, name, city_id, res.locals.user.id)

            res.status(200).json(updatedBranch)
        }
        catch (error) {
            next(error)
        }
    }

    public Destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { branch_id } = req.params;

            await this.BranchService.RemoveBranch(branch_id, res.locals.user.id)

            res.status(200).json({message: "Success"})
        }
        catch (error) {
            next(error)
        }
    }

    public GetUserBranches = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const branches = await this.BranchService.GetBranchesByUserID(res.locals.user.id);

            res.status(200).json(branches)
        }
        catch (error) {
            next(error)
        }
    }

    public GetBranch = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { branch_id } = req.params;

            const branch = await this.BranchService.GetBranchInfo(String(branch_id))
            
            res.status(200).json(branch)
        }
        catch (error) {
            next(error)
        }
    }

    public GetAndroidUserBranches = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_id } = req.query

            const branches = await this.BranchService.GetBranchesByUserID(String(user_id));

            res.status(200).json(branches)
        }
        catch (error) {
            next(error)
        }
    }

    public JoinBrnach = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { branch_id } = req.body

            await this.BranchService.JoinBranch(String(branch_id), res.locals.user.id)

            res.status(200).json("Success")
        }
        catch (error) {
            next(error)
        }
    }

    public GetStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { branch_id, page, limit } = req.query;

            const staffs = await this.BranchService.GetBranchStaff(
                String(branch_id),
                Number(page),
                Number(limit),
                res.locals.user.id
            )

            res.status(200).json(staffs)
        }
        catch (error) {
            next(error)
        }
    }

}

export default BranchController;