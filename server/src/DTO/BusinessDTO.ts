import IBusiness from "../Interfaces/Business/IBusiness";

class BusinessDTO {
    public id: string;
    public name: string;
    
    constructor(business: IBusiness) {
        this.id = business.id
        this.name = business.name
    }   
}

export default BusinessDTO;