import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { SigninComponent } from './component/signin/signin.component';
import { TasksComponent } from './component/tasks/tasks.component';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';

import { authGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrderComponent } from './component/order/order.component';
import { FinishedOrdersComponent } from './component/finished-orders/finished-orders.component';
import { RefreshDirective } from './directives/refresh.directive';
import { ClientsComponent } from './component/clients/clients.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    TasksComponent,
    AddTaskComponent,
    NavBarComponent,
    OrderComponent,
    FinishedOrdersComponent,
    RefreshDirective,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
