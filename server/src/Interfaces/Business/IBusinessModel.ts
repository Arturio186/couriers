import IBusiness from "./IBusiness";

export default interface IBusinessModel {
    Create: (business: IBusiness) => Promise<IBusiness>;
    FindAll: (conditions: Partial<IBusiness>) => Promise<IBusiness[] | undefined>
}