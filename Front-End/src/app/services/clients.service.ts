import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private URL = 'http://localhost:3000/api';
  private http = inject (HttpClient);

  constructor() { }

  getClients(){
    return this.http.get<Client[]>(this.URL+'/clients');
  }
  getClientBy(id:number){
    return this.http.get<Client>(this.URL+'/client/'+id);
  }
  deleteClientBy(id:number){
    return this.http.delete<Client>(this.URL+'/client/'+id);
  }
  sortID(clients:Client[], upside:boolean){
    let temp ;
    let i = 0;

    let finished=false;
    while(finished === false){
      finished=true;
      while(i<clients.length-1){
        if(upside ===true){
          if(clients[i].id < clients[i+1].id){
            temp = clients[i];
            clients[i] = clients[i+1];
            clients[i+1] = temp;
            finished=false;
          }
        }
        else{
          if(clients[i].id > clients[i+1].id){
            temp = clients[i];
            clients[i] = clients[i+1];
            clients[i+1] = temp;
            finished=false;
          }
        }
        i++;
      }
      i=0;
    }
    return clients;
  }

  filterPendings(clients:Client[], upside:boolean){
    let temp ;
    let i = 0;

    let finished=false;
    while(finished === false){
      finished=true;
      while(i<clients.length-1){
        if(upside ===false){
          if(clients[i].order.length < clients[i+1].order.length){
            temp = clients[i];
            clients[i] = clients[i+1];
            clients[i+1] = temp;
            finished=false;
          }
        }
        else{
          if(clients[i].order.length > clients[i+1].order.length){
            temp = clients[i];
            clients[i] = clients[i+1];
            clients[i+1] = temp;
            finished=false;
          }
        }
        i++;
      }
      i=0;
    }
    return clients;
  }
  filterFinished(clients:Client[], upside:boolean){
    let temp ;
    let i = 0;

    let finished=false;
    while(finished === false){
      finished=true;
      while(i<clients.length-1){
        if(upside ===false){
          if(clients[i].orderFinished.length < clients[i+1].orderFinished.length){
            temp = clients[i];
            clients[i] = clients[i+1];
            clients[i+1] = temp;
            finished=false;
          }
        }
        else{
          if(clients[i].orderFinished.length > clients[i+1].orderFinished.length){
            temp = clients[i];
            clients[i] = clients[i+1];
            clients[i+1] = temp;
            finished=false;
          }
        }
        i++;
      }
      i=0;
    }
    return clients;
  }

}
