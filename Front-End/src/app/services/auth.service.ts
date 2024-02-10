import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api'


  constructor(private http: HttpClient) { }

  signUp(user:any){
    return this.http.post<any>(this.URL+'/signup',user)
  }

  signIn(user:any){
    return this.http.post<any>(this.URL+'/signin',user)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
