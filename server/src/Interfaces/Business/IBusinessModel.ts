import IBusiness from "./IBusiness";

export default interface IBusinessModel {
    Create: (business: IBusiness) => Promise<IBusiness>;
}