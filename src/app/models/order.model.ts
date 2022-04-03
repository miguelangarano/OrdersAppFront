import { Client } from "./client.model";
import { Product } from "./product.model";

export class Order {
    id: string;
    client: Client;
    products: Product[];
    date: number;
    total?: number;
    clientName?: string;
    constructor(id: string, client: Client, products: Product[], date: number){
        this.id = id;
        this.client = client;
        this.products = products;
        this.date = date;
    }
}
