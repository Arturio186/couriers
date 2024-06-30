import IBranch from "./IBranch";
import IBusiness from "./IBusiness";

export default interface IBusinessWithBranches {
    business: IBusiness;
    branches: IBranch[]
}