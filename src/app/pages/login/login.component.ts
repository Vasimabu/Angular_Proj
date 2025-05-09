import { Component, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any={
    username:'',
    password:''
  };

  constructor(private router: Router) {}  // Inject the Router via constructor

  onLogin(){
    if(this.loginObj.username == "admin" && this.loginObj.password == '112233'){
      this.router.navigateByUrl('dashboard')
    } else{
      alert("wrong credentials")
    }
  }
}
