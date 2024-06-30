import IUserModel from "../Interfaces/User/IUserModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import IBusinessService from "../Interfaces/Business/IBusinessService";
import IBranchService from "../Interfaces/Branch/IBranchService";

import APIError from "../Exceptions/APIError";
import BusinessDTO from "../DTO/BusinessDTO";
import BranchDTO from "../DTO/BranchDTO";

class BusinessService implements IBusinessService {
    private readonly BusinessModel: IBusinessModel;
    private readonly UserModel: IUserModel;
    private readonly BranchService: IBranchService;

    constructor(businessModel: IBusinessModel, userModel: IUserModel, branchService: IBranchService) {
        this.BusinessModel = businessModel;
        this.UserModel = userModel;
        this.BranchService = branchService;
    }

    public SaveBusiness = async (name: string, ownerID: string) => {
        const owner = await this.UserModel.FindOne({ id: ownerID });

        if (!owner) {
            throw APIError.BadRequest("Пользователь не найден");
        }

        const createdBusiness = await this.BusinessModel.Create({
            name,
            owner_id: ownerID,
        });

        return new BusinessDTO(createdBusiness);
    };
    
    public UpdateBusiness = async (name: string, businessID: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const updatedBusiness = await this.BusinessModel.Update({ id: businessID }, { name })

        return new BusinessDTO(updatedBusiness)
    };

    public RemoveBusiness = async (businessID: string, userID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID, owner_id: userID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }
        
        return await this.BusinessModel.Delete({ id: businessID })
    };  

    public GetOwnerBusinesses = async (userID: string) => {
        const ownerBusinesses = (
            await this.BusinessModel.FindAll({ owner_id: userID })
        ).map(business => new BusinessDTO(business));

        return ownerBusinesses;
    };

    public GetBusiness = async (userID: string, businessID: string) => {
        const business = await this.BusinessModel.FindOne({ owner_id: userID, id: businessID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        const branches = await this.BranchService.GetBranchesByBusinessID(business.id, userID);

        return {
            business: new BusinessDTO(business),
            branches
        }
    }

}

export default BusinessService;
