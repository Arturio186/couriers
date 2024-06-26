import IUserModel from "../Interfaces/User/IUserModel";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import IBusinessService from "../Interfaces/Business/IBusinessService";

import APIError from "../Exceptions/APIError";

class BusinessService implements IBusinessService {
    private readonly BusinessModel: IBusinessModel;
    private readonly UserModel: IUserModel;

    constructor(businessModel: IBusinessModel, userModel: IUserModel) {
        this.BusinessModel = businessModel;
        this.UserModel = userModel;
    }

    public SaveBusiness = async (name: string, owner_id: string) => {
        const owner = await this.UserModel.FindOne({ id: owner_id });

        if (!owner) {
            throw APIError.BadRequest("Пользователь не найден");
        }

        if (owner.role !== "owner") {
            throw APIError.Forbidden("Пользователь не является владельцем бизнеса")
        }

        return await this.BusinessModel.Create({
            name,
            owner_id,
        });
    };
}

export default BusinessService;
