import { Component, Input } from '@angular/core';
import { Order, OrderFinished } from 'src/app/models/order.model';
import { Client } from 'src/app/models/client.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ClientsService } from 'src/app/services/clients.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

import { TasksComponent } from '../tasks/tasks.component';


@Component({
  selector: 'seeOrder',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css','../tasks/tasks.component.css']
})
export class OrderComponent {
  @Input() orderID : number = 0;
  @Input() orderFinishedID : number = 0;
  @Input() clientID : number = 0;
  
  order! : Order;
  orderFinished! : OrderFinished;

  client! : Client; 

  orderHaveBrand: boolean = false;
  orderHaveGPU: boolean = false;
  orderHaveHDD: boolean = false;
  orderHaveRAM: boolean = false;
  orderHaveOthers: boolean = false;
  orderHaveDescription: boolean = false;

  constructor(private tasksService: TasksService,
    private clientsService : ClientsService,
    private navBarComponent : NavBarComponent){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clientID = this.navBarComponent.clientID;

    if(this.clientID !== 0)
      this.showClient();

    if(this.orderID !== 0 || this.orderFinishedID !==0)
      this.showOrder();

  }
  processOrder(order:any){
      
    this.orderHaveBrand = false;
    if(order.brand !== '')
      this.orderHaveBrand = true;

    this.orderHaveGPU = false;
    const GPU = order.GPU.split(',');
    for(let i =0;i< GPU.length;i++){
      if(GPU[i] !=='')
        this.orderHaveGPU = true;
    }

    
    this.orderHaveHDD = false;
    const HDD = order.HDD.split(',');
    for(let i =0;i< HDD.length;i++){
      if(HDD[i] !=='')
        this.orderHaveHDD = true;
    }

    
    this.orderHaveRAM = false;
    const RAM = order.RAM.split(',');
    for(let i =0;i< RAM.length;i++){
      if(RAM[i] !=='')
        this.orderHaveRAM = true;
    }

    this.orderHaveOthers = false;
    if(order.others.trim() !== '')
      this.orderHaveOthers = true;

      
    this.orderHaveDescription = false;
    if(order.description.trim() !== '')
      this.orderHaveDescription = true;

  }

  hideOrder(){
    this.orderID = 0;
    this.orderFinishedID =0;
  }

  showOrder(){
    console.log(this.orderID);
    if(this.orderID !== 0 ){
      this.tasksService.getOrderBy(this.orderID)
        .subscribe(res =>{
          this.order = res;
          this.clientsService.getClientBy(this.order.clientId)
            .subscribe(res=>{
              this.client = res;
            })
          this.processOrder(this.order);
        },
        err =>{
          console.log(err);
        }
      );
    } 
    console.log(this.orderFinishedID);
    if(this.orderFinishedID !== 0 ){
      this.tasksService.getOrderFinishedBy(this.orderFinishedID)
        .subscribe(res =>{
          this.orderFinished = res;
          this.clientsService.getClientBy(this.orderFinished.clientId)
            .subscribe(res=>{
              this.client = res;
            })
          this.processOrder(this.orderFinished);
        },
        err =>{
          console.log(err);
        }
      );
    }
  }
  showClient(){
    this.clientsService.getClientBy(this.clientID)
      .subscribe(res=>{
        this.client = res;
        console.log(this.client);
      },
      err => console.log(err)
      );
  }

  finishOrder(completed:boolean){
    console.log(completed);
    this.tasksService.finishOrder(this.order,completed)
      .subscribe(
        res =>{
          console.log(res);
          this.client.orderFinished.push(res);
        },
        err => console.log(err)
      );
    
    this.deleteOrder();
  }
  deleteThisClient(){
    /*for(let n of this.client.order){
      this.tasksService.deleteOrderBy(n.id)
      .subscribe(
        res =>{
          console.log('eliminated');
        },
        err =>{
          console.log(err);
        }
      );
    }
    for(let n of this.client.orderFinished){
      this.tasksService.deleteOrderFinishedBy(n.id)
      .subscribe(
        res =>{
          console.log('eliminated');
        },
        err =>{
          console.log(err);
        }
      );
    }*/
    console.log(this.client.id);
    this.clientsService.deleteClientBy(this.client.id)
      .subscribe(
        res=>{  
          console.log(res)
        },
        err => console.log(err)
      )
    this.navBarComponent.showClients();
  }

  deleteThisOrder(){
    if(this.orderID !== 0){
      this.tasksService.deleteOrderBy(this.orderID)
      .subscribe(
        res =>{
          console.log('eliminated');
        },
        err =>{
          console.log(err);
        }
      );
      this.deleteOrder();
    }
    if(this.orderFinishedID !== 0){
      this.tasksService.deleteOrderFinishedBy(this.orderFinishedID)
      .subscribe(
        res =>{
          console.log('eliminated');
        },
        err =>{
          console.log(err);
        }
      );
      this.deleteOrderFinished();
    }
  }

  deleteOrder(){
    let pos = 0;
    for(let i =0;i< this.client.order.length;i++ ){
      if(this.client.order[i].id === this.orderID){
        pos = i;
        break;
      }
    }
    this.client.order.splice(pos,1);

    console.log(this.client.order);

    this.orderID = 0;
  }

  deleteOrderFinished(){
    let pos = 0;
    for(let i =0;i< this.client.orderFinished.length;i++ ){
      if(this.client.orderFinished[i].id === this.orderFinishedID){
        pos = i;
        break;
      }
    }
    this.client.orderFinished.splice(pos,1);

    console.log(this.client.orderFinished);

    this.orderFinishedID   = 0;
  }
}
