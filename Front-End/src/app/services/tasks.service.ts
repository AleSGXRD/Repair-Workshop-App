import { Injectable ,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Order, OrderFinished } from './../models/order.model';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private URL = 'http://localhost:3000/api'
  private http = inject(HttpClient)

  addTask(client:any, order:any){
    return this.http.post<any>(this.URL+'/addOrder',{client, order})
  }
  finishOrder(order:any, completed:boolean){
    return this.http.post<any>(this.URL+'/finishedorder',{order, completed})
  }
  getTasks(){
    return this.http.get<Order[]>(this.URL+'/orders');
  }
  getFinishedOrders(){
    return this.http.get<OrderFinished[]>(this.URL+'/finishedorders');
  }
  getOrderBy(id:number){
    return this.http.get<Order>(this.URL+'/orders/'+id);
  }
  getOrderFinishedBy(id:number){
    return this.http.get<OrderFinished>(this.URL+'/finishedorders/'+id);
  }
  deleteOrderBy(id:number){
    return this.http.delete<Order>(this.URL+'/orders/'+id);
  }
  deleteOrderFinishedBy(id:number){
    return this.http.delete<OrderFinished>(this.URL+'/finishedorders/'+id);
  }

  filtrarNombre(tasks:any[] ,query:any, clients:Client[]){//filtrado por nombre
    return tasks.filter(function(el:any){
      return el.client.name.toLowerCase().indexOf(query.toLowerCase()) >-1;
    })
  }

  filtrarMoney(tempArray:any[] , filterUpSide:boolean){//Filtrado por dinero
    let temp ;
    let i = 0;

    let finished=false;
    while(finished === false){
      finished=true;
      while(i<tempArray.length-1){
        if(filterUpSide ===false){
          if(tempArray[i].price<tempArray[i+1].price){
            temp = tempArray[i];
            tempArray[i] = tempArray[i+1];
            tempArray[i+1] = temp;
            finished=false;
          }
        }
        else{
          if(tempArray[i].price > tempArray[i+1].price){
            temp = tempArray[i];
            tempArray[i] = tempArray[i+1];
            tempArray[i+1] = temp;
            finished=false;
          }
        }
        i++;
      }
      i=0;
    }
    return tempArray;
  }

  filtrarDate(tempArray:any[] , filterUpSide:boolean){//Filtrado por fecha
    let temp ;
    let i = 0;

    let finished=false;
    while(finished === false){
      finished=true;
      while(i<tempArray.length-1){
        let date1 = tempArray[i].createdAt.substring(0,10).split('-');
        let date2 = tempArray[i+1].createdAt.substring(0,10).split('-');
        console.log(date1,date2, date1>date2);
        if(filterUpSide ===false){
          for(let x =0;x<=2;x++){
            console.log(date1[x]<date2[x])
            if(date1[x]<date2[x]){
              temp = tempArray[i];
              tempArray[i] = tempArray[i+1];
              tempArray[i+1] = temp;
              finished=false;
              break;
            }
          }
        }
        else{
          for(let x =0;x<2;x++){
            if(date1[x]>date2[x]){
              temp = tempArray[i];
              tempArray[i] = tempArray[i+1];
              tempArray[i+1] = temp;
              finished=false;
              break;
            }
          }
        }
        i++;
      }
      i=0;
    }
    return tempArray;
  }

  sortID(tempArray:any[] , filterUpSide:boolean){//Filtrado por dinero
    let temp ;
    let i = 0;

    let finished=false;
    while(finished === false){
      finished=true;
      while(i<tempArray.length-1){
        if(filterUpSide ===true){
          if(tempArray[i].id<tempArray[i+1].id){
            temp = tempArray[i];
            tempArray[i] = tempArray[i+1];
            tempArray[i+1] = temp;
            finished=false;
          }
        }
        else{
          if(tempArray[i].id > tempArray[i+1].id){
            temp = tempArray[i];
            tempArray[i] = tempArray[i+1];
            tempArray[i+1] = temp;
            finished=false;
          }
        }
        i++;
      }
      i=0;
    }
    return tempArray;
  }


}
