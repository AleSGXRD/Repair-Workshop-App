import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { TasksComponent } from './component/tasks/tasks.component'; 
import { SignupComponent } from './component/signup/signup.component';

import { SigninComponent } from './component/signin/signin.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';

import { OrderComponent } from './component/order/order.component';

import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/signin',
    title:'SignIn',
    pathMatch: 'full'
  },
  {
  path:'tasks',
  component: TasksComponent,
  canActivate: [authGuard]
  },
  {
  path:'lobby',
  title:'Lobby',
  component: NavBarComponent,
  canActivate: [authGuard]
  },
  {
  path:'signup',
  component: SignupComponent,
  },
  {
  path:'signin',
  title:'SignIn',
  component: SigninComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
