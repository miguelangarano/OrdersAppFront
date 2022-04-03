import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Product[]> {
    const response = await this.http.get(this.baseUrl + "Products").toPromise();
    const body = JSON.parse(JSON.stringify(response));
    return body;
  }

  async get(id: string): Promise<Product> {
    const response = await this.http.get(this.baseUrl + "Products/"+id).toPromise();
    const body = JSON.parse(JSON.stringify(response));
    return body;
  }

  async create(product: Product): Promise<Product> {
    const response = await this.http.post(this.baseUrl + "Products", product).toPromise();
    const body = JSON.parse(JSON.stringify(response));
    console.log(body)
    return body;
  }

  async update(id: string, product: Product) {
    await this.http.put(this.baseUrl + "Products/"+id, product).toPromise();
  }

  async delete(id: string) {
    await this.http.delete(this.baseUrl + "Products/"+id).toPromise();
  }
}
