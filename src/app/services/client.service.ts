import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Client[]> {
    const response = await this.http.get(this.baseUrl + "Clients").toPromise();
    const body = JSON.parse(JSON.stringify(response));
    return body;
  }

  async get(id: string): Promise<Client> {
    const response = await this.http.get(this.baseUrl + "Clients/"+id).toPromise();
    const body = JSON.parse(JSON.stringify(response));
    return body;
  }

  async create(client: Client): Promise<Client> {
    const response = await this.http.post(this.baseUrl + "Clients", client).toPromise();
    const body = JSON.parse(JSON.stringify(response));
    console.log(body)
    return body;
  }

  async update(id: string, client: Client) {
    await this.http.put(this.baseUrl + "Clients/"+id, client).toPromise();
  }

  async delete(id: string) {
    await this.http.delete(this.baseUrl + "Clients/"+id).toPromise();
  }
}
