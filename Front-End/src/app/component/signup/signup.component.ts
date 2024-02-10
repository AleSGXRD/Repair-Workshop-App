import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router
    ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  haveAlreadyAccount(){
    this.router.navigate(['/signin'])
  }

  signUp(){
    this.authService.signUp(this.user)
    .subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/lobby'])
      },  
      err => console.log(err)
    );
  }
}
