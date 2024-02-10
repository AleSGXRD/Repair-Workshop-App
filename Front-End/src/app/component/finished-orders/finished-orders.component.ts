import { Component, ElementRef, inject } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';
import { ViewChild, AfterViewInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Order, OrderFinished } from './../../models/order.model';
import { Client } from 'src/app/models/client.model';

import { NavBarComponent } from '../../component/nav-bar/nav-bar.component';

@Component({
  selector: 'finished-orders',
  templateUrl: './finished-orders.component.html',
  styleUrls: ['./finished-orders.component.css', '../tasks/tasks.component.css']
})
export class FinishedOrdersComponent {

  dataOrders:OrderFinished[] =[];
  dataClients:Client[] = [];

  orders:OrderFinished[] =[];
  clients:Client[] = [];

  filterMoney:boolean = false;
  filterTime:boolean = false;
  filterUpSide:boolean = false;

  word:string = '';
  navBarComponent:NavBarComponent = inject(NavBarComponent);

  
  constructor(
    private tasksService : TasksService,
    private clientsService : ClientsService,
    private router : Router)
    {
      
    }
  ngOnInit(){  
    this.CargarDB();
  }
  CargarDB(){
    this.clientsService.getClients()
      .subscribe(
        res=>{
          this.dataClients = res;
          this.clients = res;
        },
        err => console.log(err)
      )
    this.tasksService.getFinishedOrders()
      .subscribe(
        res=>{
          console.log(res);
          this.dataOrders = res;
          this.orders=res;
        },
        err => console.log(err)
      )
  }


  activeFilterMoney(){
    this.filterMoney=!this.filterMoney;
    this.filtrar();
  }
  activeFilterTime(){
    this.filterTime=!this.filterTime;
    this.filtrar();
  }
  activeFilterUpSide(){
    this.filterUpSide=!this.filterUpSide;
    this.filtrar();
  }

  filtrar(){ //FILTRADO GENERAL
    this.orders = this.Search();
    this.orders = this.tasksService.sortID(this.orders,this.filterUpSide);
    console.log(this.orders);
    
    if(this.filterMoney===true)
      this.orders = this.tasksService.filtrarMoney(this.orders,this.filterUpSide);//FILTRA POR EL DINERO 
    if(this.filterTime===true)
      this.orders = this.tasksService.filtrarDate(this.orders,this.filterUpSide);//FILTRA POR LA FECHA 
  }

  Search(){ //FILTRA POR LA PALABRA DEL BUSCADOR
    if(!this.word){
      return this.dataOrders;
    }
    else{
      return this.dataOrders.filter((el:any)=>{
        return el.client.name.toLowerCase().indexOf(this.word.toLowerCase()) >-1;
      })
    }
  }
}
