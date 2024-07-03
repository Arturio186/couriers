import IBranchModel from "../Interfaces/Branch/IBranchModel";
import IBranchService from "../Interfaces/Branch/IBranchService";
import IBusinessService from "../Interfaces/Business/IBusinessService";

import APIError from "../Exceptions/APIError";
import BranchDTO from "../DTO/BranchDTO";
import ICityService from "../Interfaces/City/ICityService";

class BranchService implements IBranchService {
    private readonly BranchModel: IBranchModel;
    private readonly BusinessService: IBusinessService;
    private readonly CityService: ICityService;

    constructor(branchModel: IBranchModel, businessService: IBusinessService, cityService: ICityService) {
        this.BranchModel = branchModel;
        this.BusinessService = businessService;
        this.CityService = cityService;
    }

    public FindBranch = async (branchID: string) => {
        const branch = await this.BranchModel.FindOne({ id: branchID })

        if (!branch) {
            throw APIError.BadRequest("Филиал не найден");
        }

        return branch;
    }

    public GetBranchesByBusinessID = async (businessID: string, userID: string) => {
        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const branches = await this.BranchModel.FindAll({ business_id: businessID })

        return branches.map((branch) => new BranchDTO(branch));
    };

    public SaveBranch = async (name: string, businessID: string, cityID: number, userID: string) => {
        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const city = await this.CityService.FindCity(cityID)

        const createdBranch = await this.BranchModel.Create({
            name,
            business_id: businessID,
            city_id: city.id,
        })

        return new BranchDTO(createdBranch)
    }

    public RemoveBranch = async (businessID: string, branchID: string, userID: string) => {
        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const branch = await this.FindBranch(branchID)
        
        return await this.BranchModel.Delete({ id: branch.id })
    }; 
    
    public UpdateBranch = async (businessID: string, branchID: string, name: string, cityID: number, userID: string) => {
        const isCorrectOwner = await this.BusinessService.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const branch = await this.FindBranch(branchID)

        const updatedBranch = await this.BranchModel.Update({ id: branch.id }, { name, city_id: cityID })

        return new BranchDTO(updatedBranch)
    };
}

export default BranchService;
