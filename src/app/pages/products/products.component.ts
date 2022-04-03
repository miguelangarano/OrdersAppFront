import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  products: Product[] = [];
  modalStatus: boolean = false;
  modalDeleteStatus: boolean = false;
  modalCreateStatus: boolean = false;
  currentProduct: Product | undefined = undefined;
  

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productService.getAll().then(response=>{
      console.log("GET ALL", response);
      this.products = response;
    });
  }

  manageModal(product: Product){
    this.modalStatus = true;
    this.currentProduct = product;
  }

  onEditAccept(){
    console.log("UPDATE", this.currentProduct)
    if(this.currentProduct!=null && this.currentProduct.code!='' && this.currentProduct.name!='' && this.currentProduct.price!=0){
      this.productService.update(this.currentProduct.id, this.currentProduct);
      this.modalStatus = false;
      this.currentProduct = undefined;
      alert("Producto Actualizado");
    }else{
      alert("Debes ingresar todos los datos del producto")
    }
  }

  onEditCancel(){
    this.modalStatus = false;
    this.currentProduct = undefined;
  }

  onInputsChange(event:any){
    if(this.currentProduct!=null){
      switch(event.target.name){
        case "Codigo":{
          this.currentProduct.code = event.target.value;
          break;
        }
        case "Nombre":{
          this.currentProduct.name = event.target.value;
          break;
        }
        case "Precio":{
          this.currentProduct.price = Number(event.target.value);
          break;
        }
        default:
          break;
      }
    }
  }

  manageDeleteModal(product: Product){
    this.modalDeleteStatus = true;
    this.currentProduct = product;
  }

  onDeleteAccept(){
    console.log("DELETE", this.currentProduct)
    if(this.currentProduct!=null){
      this.productService.delete(this.currentProduct.id);
      this.products = this.products.filter(item=>item.id!=this.currentProduct?.id);
      this.modalDeleteStatus = false;
      this.currentProduct = undefined;
      alert("Producto Eliminado");
    }
  }

  onDeleteCancel(){
    this.modalDeleteStatus = false;
    this.currentProduct = undefined;
  }

  manageCreateModal(){
    this.modalCreateStatus = true;
    this.currentProduct = new Product('', '', '', 0);
  }

  async onCreateAccept(){
    console.log("CREAR", this.currentProduct)
    if(this.currentProduct!=null && this.currentProduct.code!='' && this.currentProduct.name!='' && this.currentProduct.price!=0){
      const product = await this.productService.create(this.currentProduct);
      this.products.push(product);
      this.modalCreateStatus = false;
      this.currentProduct = undefined;
      alert("Producto Creado");
    }else{
      alert("Debes ingresar todos los datos del producto")
    }
  }

  onCreateCancel(){
    this.modalCreateStatus = false;
    this.currentProduct = undefined;
  }
}
