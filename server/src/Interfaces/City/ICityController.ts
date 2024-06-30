import { Request, Response, NextFunction } from "express";

export default interface ICityController {
    FindByName: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}