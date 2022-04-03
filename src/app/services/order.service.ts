import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Order[]> {
    const response = await this.http.get(this.baseUrl + "Orders").toPromise();
    const body = JSON.parse(JSON.stringify(response));
    return body;
  }

  async get(id: string): Promise<Order> {
    const response = await this.http.get(this.baseUrl + "Orders/"+id).toPromise();
    const body = JSON.parse(JSON.stringify(response));
    return body;
  }

  async create(order: Order): Promise<Order> {
    const response = await this.http.post(this.baseUrl + "Orders", order).toPromise();
    const body = JSON.parse(JSON.stringify(response));
    console.log(body)
    return body;
  }

  async update(id: string, order: Order) {
    await this.http.put(this.baseUrl + "Orders/"+id, order).toPromise();
  }

  async delete(id: string) {
    await this.http.delete(this.baseUrl + "Orders/"+id).toPromise();
  }
}
