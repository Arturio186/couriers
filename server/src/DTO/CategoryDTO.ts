import ICategory from "../Interfaces/Category/ICategory";

class CategoryDTO {
    public id: string;
    public name: string;

    constructor(category: ICategory) {
        this.id = category.id
        this.name = category.name
    }   
}

export default CategoryDTO;