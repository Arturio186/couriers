import ICategory from "../Interfaces/Category/ICategory";

class CategoryDTO {
    public id: string;
    public name: string;
    public business_id: string;

    constructor(category: ICategory) {
        this.id = category.id
        this.name = category.name
        this.business_id = category.business_id
    }   
}

export default CategoryDTO;