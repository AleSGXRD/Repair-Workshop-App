import { Component, inject } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  clients:Client[] = []
  clientsData:Client[] = []


  filterPendings:boolean = false;
  filterFinished:boolean = false;
  filterUpSide:boolean = false;

  word:string = '';
  navBarComponent:NavBarComponent = inject(NavBarComponent);

  manyOrders: number = 0;

  constructor(private clientService : ClientsService){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clientService.getClients()
    .subscribe(
      res =>{
        this.clientsData = res;
        this.clients = res;
      },
      err => {console.log(err)}
    );
  }
  activeFilterPendings(){
    this.filterPendings=!this.filterPendings;
    this.filtrar();
  }
  activeFilterFinished(){
    this.filterFinished=!this.filterFinished;
    this.filtrar();
  }
  activeFilterUpSide(){
    this.filterUpSide=!this.filterUpSide;
    this.filtrar();
  }
  filtrar(){ //FILTRADO GENERAL
    this.clients = this.Search();
    this.clients = this.clientService.sortID(this.clients,this.filterUpSide);
    
    if(this.filterPendings===true)
      this.clients = this.clientService.filterPendings(this.clients,this.filterUpSide);//FILTRA POR LOS PEDIDOS PENDIENTES 
    if(this.filterFinished===true)
      this.clients = this.clientService.filterFinished(this.clients,this.filterUpSide);//FILTRA POR LA PEDIDOS FINALIZADOS 
  }
  Search(){ //FILTRA POR LA PALABRA DEL BUSCADOR
    if(!this.word){
      return this.clientsData;
    }
    else{
      return this.clientsData.filter((n)=>{
        return n.name.toLowerCase().indexOf(this.word.toLowerCase()) >-1;
      })
    }
  }
}

