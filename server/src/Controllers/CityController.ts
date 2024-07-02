import { Request, Response, NextFunction } from "express";

import ICityController from "../Interfaces/City/ICityController";
import ICityService from "../Interfaces/City/ICityService";

class CityController implements ICityController {
    private readonly CityService: ICityService

    constructor(cityService: ICityService) {
        this.CityService = cityService
    }

    public FindByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.query
            
            const cities = await this.CityService.FindCitiesByName(name.toString())

            res.status(200).json(cities)
        }
        catch (error) {
            next(error)
        }
    }
}

export default CityController;