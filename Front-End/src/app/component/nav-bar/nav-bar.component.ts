import { Component } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';
import { TasksService } from 'src/app/services/tasks.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  addOrder:boolean;
  watchOrders:boolean;
  watchOrdersFinished:boolean;
  watchClients:boolean;

  clientID:number = 0;
  orderID:number = 0;
  orderFinishedID:number = 0;

  order!:Order;
  client!:Client;

  showThisOrder:boolean = false;

  refresh : number = 0;

  refreshWindow(){
    this.refresh = this.refresh? 0: 1;
  }

  constructor(private tasksService:TasksService){
    this.addOrder=false;
    this.watchOrders=true;
    this.watchOrdersFinished=false;
    this.showThisOrder=false;
    this.watchClients=false;
  }

  ngOnInit(): void { }

  showAddOrder(){
    this.addOrder=true;
    this.watchOrders=false;
    this.watchOrdersFinished=false;
    this.showThisOrder=false;
    this.watchClients=false;
  }
  showWatchOrders(){
    this.addOrder=false;
    this.watchOrders=true;
    this.watchOrdersFinished=false;
    this.showThisOrder=false;
    this.watchClients=false;
  }
  showWatchOrdersFinished(){
    this.addOrder=false;
    this.watchOrders=false;
    this.watchOrdersFinished=true;
    this.showThisOrder=false;
    this.watchClients=false;
  }
  showClients(){
    this.addOrder=false;
    this.watchOrders=false;
    this.watchOrdersFinished=false;
    this.showThisOrder=false;
    this.watchClients=true;
  }
  ShowThisOrder(){
    this.addOrder=false;
    this.watchOrders=false;
    this.watchOrdersFinished=false;
    this.showThisOrder=true;
    this.watchClients=false;
  }

  showTask(index:number){
    console.log('su id es : '+index);
    this.orderID = index;
    this.orderFinishedID =0;
    this.ShowThisOrder();
  }
  showOrderFinished(index:number){
    console.log('su id es : '+index);
    this.orderFinishedID = index;
    this.orderID = 0;
    this.ShowThisOrder();
  }
  showClient(index:number){
    console.log('su id es : '+index);
    this.clientID = index;
    this.orderFinishedID =0;
    this.orderID = 0;
    this.ShowThisOrder();
  }
}
