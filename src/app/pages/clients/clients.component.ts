import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientService: ClientService;
  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  clients: Client[] = [];
  modalStatus: boolean = false;
  modalDeleteStatus: boolean = false;
  modalCreateStatus: boolean = false;
  currentClient: Client | undefined = undefined;
  

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clientService.getAll().then(response=>{
      console.log("GET ALL", response);
      this.clients = response;
    });
  }

  manageModal(client: Client){
    this.modalStatus = true;
    this.currentClient = client;
  }

  onEditAccept(){
    console.log("UPDATE", this.currentClient)
    if(this.currentClient!=null && this.currentClient.fullname!='' && this.currentClient.phone!=''){
      this.clientService.update(this.currentClient.id, this.currentClient);
      this.modalStatus = false;
      this.currentClient = undefined;
      alert("Cliente Actualizado");
    }else{
      alert("Debes ingresar todos los datos del cliente")
    }
  }

  onEditCancel(){
    this.modalStatus = false;
    this.currentClient = undefined;
  }

  onInputsChange(event:any){
    if(this.currentClient!=null){
      switch(event.target.name){
        case "Nombre y Apellido":{
          this.currentClient.fullname = event.target.value;
          break;
        }
        case "Telefono":{
          this.currentClient.phone = event.target.value;
          break;
        }
        default:
          break;
      }
    }
  }

  manageDeleteModal(client: Client){
    this.modalDeleteStatus = true;
    this.currentClient = client;
  }

  onDeleteAccept(){
    console.log("DELETE", this.currentClient)
    if(this.currentClient!=null){
      this.clientService.delete(this.currentClient.id);
      this.clients = this.clients.filter(item=>item.id!=this.currentClient?.id);
      this.modalDeleteStatus = false;
      this.currentClient = undefined;
      alert("Cliente Eliminado");
    }
  }

  onDeleteCancel(){
    this.modalDeleteStatus = false;
    this.currentClient = undefined;
  }

  manageCreateModal(){
    this.modalCreateStatus = true;
    this.currentClient = new Client('', '', '');
  }

  async onCreateAccept(){
    console.log("CREAR", this.currentClient)
    if(this.currentClient!=null && this.currentClient.fullname!='' && this.currentClient.phone!=''){
      const client = await this.clientService.create(this.currentClient);
      this.clients.push(client);
      this.modalCreateStatus = false;
      this.currentClient = undefined;
      alert("Cliente Creado");
    }else{
      alert("Debes ingresar todos los datos del cliente")
    }
  }

  onCreateCancel(){
    this.modalCreateStatus = false;
    this.currentClient = undefined;
  }
}
