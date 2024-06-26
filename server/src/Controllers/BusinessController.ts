import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import APIError from "../Exceptions/APIError";

import IBusinessController from "../Interfaces/Business/IBusinessController";
import IBusinessService from "../Interfaces/Business/IBusinessService";

class BusinessController implements IBusinessController {
    private readonly BusinessService: IBusinessService

    constructor(businessService: IBusinessService) {
        this.BusinessService = businessService
    }

    public Store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(APIError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const { name } = req.body;

            const createdBusiness = await this.BusinessService.SaveBusiness(name, res.locals.user.id)

            res.status(200).json(createdBusiness)

        }
        catch (error) {
            next(error)
        }
    }

    public GetMyBusiness = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userBusinesses = await this.BusinessService.GetOwnerBusinesses(res.locals.user.id)
            
            res.status(200).json(userBusinesses)
        }
        catch (error) {
            next(error)
        }
    }
}

export default BusinessController;