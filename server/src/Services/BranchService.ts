import IBranchModel from "../Interfaces/Branch/IBranchModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import IBranchService from "../Interfaces/Branch/IBranchService";

import APIError from "../Exceptions/APIError";
import BranchDTO from "../DTO/BranchDTO";
import ICityModel from "../Interfaces/City/ICityModel";

class BranchService implements IBranchService {
    private readonly BranchModel: IBranchModel;
    private readonly BusinessModel: IBusinessModel;
    private readonly CityModel: ICityModel;

    constructor(branchModel: IBranchModel, businessModel: IBusinessModel, cityModel: ICityModel) {
        this.BranchModel = branchModel;
        this.BusinessModel = businessModel;
        this.CityModel = cityModel;
    }

    public GetBranchesByBusinessID = async (businessID: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const branches = await this.BranchModel.FindAll({ business_id: businessID })

        return branches.map((branch) => new BranchDTO(branch));
    };

    public SaveBranch = async (name: string, businessID: string, cityID: number, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const city = await this.CityModel.FindOne({ id: cityID })

        if (!city) {
            throw APIError.BadRequest("Город не найден")
        }

        const createdBranch = await this.BranchModel.Create({
            name,
            business_id: business.id,
            city_id: cityID,
        })

        return new BranchDTO(createdBranch)
    }

    public RemoveBranch = async (businessID: string, branchID: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const branch = await this.BranchModel.FindOne({ id: branchID })

        if (!branch) {
            throw APIError.BadRequest("Филиал не найден");
        }
        
        return await this.BranchModel.Delete({ id: branchID })
    };  
}

export default BranchService;
