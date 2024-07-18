import IBusinessModel from "../Interfaces/Business/IBusinessModel";
import IBusinessService from "../Interfaces/Business/IBusinessService";

import APIError from "../Exceptions/APIError";
import BusinessDTO from "../DTO/BusinessDTO";

class BusinessService implements IBusinessService {
    private readonly BusinessModel: IBusinessModel;

    constructor(businessModel: IBusinessModel) {
        this.BusinessModel = businessModel;
    }

    public FindBusiness = async (businessID: string) => {
        const business = await this.BusinessModel.FindOne({ id: businessID })

        if (!business) {
            throw APIError.BadRequest("Бизнес не найден");
        }

        return business;
    }

    public SaveBusiness = async (name: string, ownerID: string) => {
        const createdBusiness = await this.BusinessModel.Create({
            name,
            owner_id: ownerID,
        });

        return new BusinessDTO(createdBusiness);
    };
    
    public UpdateBusiness = async (name: string, businessID: string, userID: string) => {
        const isCorrectOwner = await this.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const updatedBusiness = await this.BusinessModel.Update({ id: businessID }, { name })

        return new BusinessDTO(updatedBusiness)
    };

    public RemoveBusiness = async (businessID: string, userID: string) => {
        const isCorrectOwner = await this.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
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
        const business = await this.FindBusiness(businessID)

        const isCorrectStaff = await this.IsUserWorkInBusiness(business.id, userID)

        if (!isCorrectStaff)
            throw APIError.Forbidden("Нет доступа к бизнесу");

        return new BusinessDTO(business)
    }

    public IsOwnerHaveBusiness = async (businessID: string, ownerID: string) => {
        const business = await this.FindBusiness(businessID)

        return business.owner_id === ownerID; 
    }

    public IsUserWorkInBusiness = async (businessID: string, userID: string) => {
        const business = await this.FindBusiness(businessID)

        if (business.owner_id !== userID) {
            const staffRow = await this.BusinessModel.FindUserInStaffs(userID, businessID)

            if (!staffRow) {
                return false;
            }
        }

        return true;
    }

    public GetStatisticSales = async (businessID: string, userID: string) => {
        const isCorrectOwner = await this.IsOwnerHaveBusiness(businessID, userID);

        if (!isCorrectOwner) {
            throw APIError.Forbidden("Нет доступа к бизнесу");
        }

        const sales = await this.BusinessModel.GetBranchSalesByBusinessID(businessID)

        return sales.map((sale) => {
            return {
                branch_name: sale.branch_name,
                total_sales: Number(sale.total_sales),
                total_orders: Number(sale.total_orders)
            }
        })
    }
}

export default BusinessService;
