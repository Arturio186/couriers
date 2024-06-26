import IUserModel from "../Interfaces/User/IUserModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import IBusinessService from "../Interfaces/Business/IBusinessService";

import APIError from "../Exceptions/APIError";
import BusinessDTO from "../DTO/BusinessDTO";

class BusinessService implements IBusinessService {
    private readonly BusinessModel: IBusinessModel;
    private readonly UserModel: IUserModel;

    constructor(businessModel: IBusinessModel, userModel: IUserModel) {
        this.BusinessModel = businessModel;
        this.UserModel = userModel;
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

    public GetOwnerBusinesses = async (ownerID: string) => {

        const ownerBusinesses = (
            await this.BusinessModel.FindAll({ owner_id: ownerID })
        ).map((business) => new BusinessDTO(business));

        return ownerBusinesses;
    };
}

export default BusinessService;
