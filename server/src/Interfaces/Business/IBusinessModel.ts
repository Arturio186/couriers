import IBusiness from "./IBusiness";

export default interface IBusinessModel {
    Create: (business: IBusiness) => Promise<IBusiness>;
    Update: (conditions: Partial<IBusiness>, data: Partial<IBusiness>) => Promise<IBusiness>
    Delete: (conditions: Partial<IBusiness>) => Promise<number>
    FindAll: (conditions: Partial<IBusiness>) => Promise<IBusiness[] | undefined>
    FindOne: (conditions: Partial<IBusiness>) => Promise<IBusiness | undefined>
    FindUserInStaffs: (userID: string) => Promise<{ business_id: string; user_id: string } | undefined>
}