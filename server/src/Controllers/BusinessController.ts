import { Request, Response, NextFunction } from "express";

import IBusinessController from "../Interfaces/Business/IBusinessController";
import IBusinessService from "../Interfaces/Business/IBusinessService";

class BusinessController implements IBusinessController {
    private readonly BusinessService: IBusinessService

    constructor(businessService: IBusinessService) {
        this.BusinessService = businessService
    }

    public Store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;

            const createdBusiness = await this.BusinessService.SaveBusiness(name, res.locals.user.id)

            res.status(200).json(createdBusiness)

        }
        catch (error) {
            next(error)
        }
    }

    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const updatedBusiness = await this.BusinessService.UpdateBusiness(name, id, res.locals.user.id)

            res.status(200).json(updatedBusiness)
        }
        catch (error) {
            next(error)
        }
    }

    public Destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            await this.BusinessService.RemoveBusiness(id, res.locals.user.id)

            res.status(200).json({message: "Success"})
        }
        catch (error) {
            next(error)
        }
    }

    public GetMyBusinesses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userBusinesses = await this.BusinessService.GetOwnerBusinesses(res.locals.user.id)
            
            res.status(200).json(userBusinesses)
        }
        catch (error) {
            next(error)
        }
    }

    public GetBusiness = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const business = await this.BusinessService.GetBusiness(res.locals.user.id, id)
            
            res.status(200).json(business)
        }
        catch (error) {
            next(error)
        }
    }
}

export default BusinessController;