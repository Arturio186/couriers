import IBusiness from "./IBusiness";

export default interface IBusinessModel {
    Create: (business: IBusiness) => Promise<IBusiness>;
    Update: (conditions: Partial<IBusiness>, data: Partial<IBusiness>) => Promise<number>
    Delete: (conditions: Partial<IBusiness>) => Promise<number>
    FindAll: (conditions: Partial<IBusiness>) => Promise<IBusiness[] | undefined>
    FindOne: (conditions: Partial<IBusiness>) => Promise<IBusiness | undefined>
}