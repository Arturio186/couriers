import IBranchModel from "../Interfaces/Branch/IBranchModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import IBranchService from "../Interfaces/Branch/IBranchService";

import APIError from "../Exceptions/APIError";
import BranchDTO from "../DTO/BranchDTO";

class BranchService implements IBranchService {
    private readonly BranchModel: IBranchModel;
    private readonly BusinessModel: IBusinessModel;

    constructor(branchModel: IBranchModel, businessModel: IBusinessModel) {
        this.BranchModel = branchModel;
        this.BusinessModel = businessModel;
    }

    public GetBranchesByBusinessID = async (businessID: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const branches = await this.BranchModel.FindAll({ business_id: businessID })

        return branches.map((branch) => new BranchDTO(branch));
    };

}

export default BranchService;
