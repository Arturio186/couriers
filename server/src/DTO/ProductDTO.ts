import IProduct from "../Interfaces/Product/IProduct";

class ProductDTO {
    public id: string;
    public name: string;
    public price: number;
    
    constructor(product: IProduct) {
        this.id = product.id
        this.name = product.name
        this.price = product.price
    }   
}

export default ProductDTO;