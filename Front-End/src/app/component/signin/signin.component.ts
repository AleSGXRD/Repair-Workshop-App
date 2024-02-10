import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user = {
    name: '',
    password: ''
  }
  hasError:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //if(this.authService.loggedIn())
      //this.router.navigate(['lobby'])
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['lobby']);
      },
      err => {console.log(err);this.hasError=true;}
    )
    
    
  }
}
