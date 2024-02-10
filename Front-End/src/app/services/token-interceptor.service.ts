import { Injectable, inject } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  authService:AuthService = inject(AuthService);

  intercept(req:any, next:any) {
    const tokenizeReq = req.clone({
      setHeaders:{  
        Authorization: 'Bearer '+this.authService.getToken()
      }
    })
    return next.handle(tokenizeReq);
  }
  
  constructor() { }
}
