import IBranch from "../Interfaces/Branch/IBranch";

class BranchDTO {
    public id: string;
    public name: string;
    
    constructor(branch: IBranch) {
        this.id = branch.id
        this.name = branch.name
    }   
}

export default BranchDTO;