import { Component, inject } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';

import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'add-order',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  navBarComponent: NavBarComponent = inject(NavBarComponent);
  client = {
    name :'',
    ci:'',
    email :'',
    phoneNumber :''
  }
  
  order = {
    kind : 'PC',
    brand:'',
    motherBoard:'',
    CPU:'',
    powerSupply:'',
    GPU:[{name:''},{name:''},{name:''},{name:''}],
    HDD:[{name:''},{name:''},{name:''},{name:''},{name:''},{name:''},],
    RAM:[{name:''},{name:''},{name:''},{name:''},{name:''},{name:''},],
    others: '',
    description: '',
    price: 0
  }

  haveMotherBoard:boolean = false;
  haveCPU:boolean = false;
  havePowerSupply:boolean = false;
  haveOthers:boolean = false;

  haveGPU:boolean = false;
  manyGPU = 0;

  haveHDD:boolean = false;
  manyHDD = 0;

  haveRAM:boolean = false;
  manyRAM = 0;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ){

  }
  ngOnInit(): void { }

  sendInfo(){
    this.tasksService.addTask(this.client,this.order)
    .subscribe(
      res =>{
        this.router.navigate(['/tasks'])
      },
      err =>console.log(err)
    )
    
  }
  refresh(){
    this.navBarComponent.refreshWindow();
  }
}
