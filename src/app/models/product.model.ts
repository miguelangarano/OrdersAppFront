export class Product {
    id: string;
    code: string;
    name: string;
    price: number;
    constructor(id: string, code: string, name: string, price: number){
        this.id = id;
        this.code = code;
        this.name = name;
        this.price = price;
    }
}
