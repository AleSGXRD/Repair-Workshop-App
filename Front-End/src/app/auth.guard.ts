import { CanActivateFn } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).loggedIn())
    return true;
  else{
    inject(Router).navigate(['signin']);
    return false;
  }
};
