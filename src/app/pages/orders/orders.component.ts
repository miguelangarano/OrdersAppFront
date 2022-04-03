import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderService: OrderService;
  clientService: ClientService;
  productService: ProductService;
  constructor(orderService: OrderService, clientService: ClientService, productService: ProductService) {
    this.orderService = orderService;
    this.clientService = clientService;
    this.productService = productService;
  }

  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = [];
  modalStatus: boolean = false;
  modalDeleteStatus: boolean = false;
  modalCreateStatus: boolean = false;
  modalClientStatus: boolean = false;
  modalProductsStatus: boolean = false;
  currentOrder: Order | undefined = undefined;
  currentClient: Client | undefined = undefined;
  currentProducts: Product[] = [];

  onClientSelect(client: Client){
    this.currentClient = client;
  }

  manageClientModal(){
    this.modalClientStatus = true;
  }

  onClientClose(){
    this.modalClientStatus = false;
  }

  onProductSelect(product: Product){
    if(!this.itemExists(this.currentProducts, product.id)){
      this.currentProducts.push(product);
    }
  }

  onProductRemove(product: Product){
    this.currentProducts = this.currentProducts.filter(item=>item.id!==product.id);
  }

  manageProductsModal(){
    this.modalProductsStatus = true;
  }

  onProductsClose(){
    this.modalProductsStatus = false;
  }
  

  ngOnInit(): void {
    this.getAll();
    this.clientService.getAll().then(response=>{
      this.clients = response;
      this.productService.getAll().then(response=>{
        this.products = response;
        this.orderService.getAll().then(response=>{
          const ords: Order[] = [];
          response.forEach(item=>{
            ords.push({...item, total: this.calculateTotal(item.products), clientName: item.client.fullname});
          });
          this.orders = ords;
        });
      });
    });
  }

  getAll(){
    this.orderService.getAll().then(response=>{
      console.log("GET ALL", response);
      this.orders = response;
    });
  }

  manageModal(order: Order){
    this.modalStatus = true;
    this.currentOrder = order;
    this.currentClient = this.currentOrder.client;
    this.currentProducts = [...this.currentOrder.products];
  }

  onEditAccept(){
    console.log("UPDATE", this.currentOrder)
    if(this.currentOrder!=null && this.currentClient && this.currentProducts.length!=0){
      this.currentOrder.client = this.currentClient;
      this.currentOrder.products = this.currentProducts;
      if(JSON.stringify(this.currentOrder)===JSON.stringify(this.orders.find(item=>item.id===this.currentOrder?.id))){
        alert("No se ha realizado ningun cambio");
        return;
      }
      this.orderService.update(this.currentOrder.id, this.currentOrder);
      this.modalStatus = false;
      this.currentOrder = undefined;
      this.currentClient = undefined;
      this.currentProducts = [];
      alert("Orden Actualizado");
    }else{
      alert("Debes seleccionar un cliente y al menos un producto")
    }
  }

  onEditCancel(){
    this.modalStatus = false;
    this.currentOrder = undefined;
  }

  manageDeleteModal(order: Order){
    this.modalDeleteStatus = true;
    this.currentOrder = order;
  }

  onDeleteAccept(){
    console.log("DELETE", this.currentOrder)
    if(this.currentOrder!=null){
      this.orderService.delete(this.currentOrder.id);
      this.orders = this.orders.filter(item=>item.id!=this.currentOrder?.id);
      this.modalDeleteStatus = false;
      this.currentOrder = undefined;
      this.currentClient = undefined;
      this.currentProducts = [];
      alert("Orden Eliminada");
    }
  }

  onDeleteCancel(){
    this.modalDeleteStatus = false;
    this.currentOrder = undefined;
  }

  manageCreateModal(){
    this.modalCreateStatus = true;
    this.currentOrder = new Order('', {id: '', fullname: '', phone: ''}, [], 0);
  }

  async onCreateAccept(){
    console.log("CREAR", this.currentOrder)
    if(this.currentOrder!=null && this.currentClient && this.currentProducts.length!=0){
      this.currentOrder.client = this.currentClient;
      this.currentOrder.products = this.currentProducts;
      this.currentOrder.date = new Date().getTime();
      const order = await this.orderService.create(this.currentOrder);
      this.orders.push(order);
      this.modalCreateStatus = false;
      this.currentOrder = undefined;
      this.currentClient = undefined;
      this.currentProducts = [];
      alert("Orden Creada");
    }else{
      alert("Debes seleccionar un cliente y al menos un producto")
    }
  }

  onCreateCancel(){
    this.modalCreateStatus = false;
    this.currentOrder = undefined;
  }

  itemExists(list: any[], id: string){
    if(list.find(item=>item.id===id)){
      return true;
    }
    return false;
  }

  calculateTotal(list: Product[]): number{
    let total:number = 0;
    list.forEach(item=>{
      total = total + item.price;
    });
    return total;
  }

  getDate(date: number): string{
    return new Date(date).toISOString().split("T")[0];
  }
}
