import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variable that binds with html form.
  loginForm: FormGroup;
  emailPlaceholder: string;
  passwordPlaceholder : string;
  requestedUser: User;

  constructor() { }

  ngOnInit() {
    
    this.loginForm = new FormGroup({
      'loginData': new FormGroup({
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,[Validators.required])
      })
    });

    this.emailPlaceholder = "please enter your email here";
    this.passwordPlaceholder = "please enter your password here";
    this.requestedUser = new User(); 
  }

  //method that handles login form submit button.
  onLoginSubmit() {
    this.requestedUser.eMail = this.loginForm.get('loginData.email').value;
    this.requestedUser.password = this.loginForm.get('loginData.password').value;
    console.log(this.requestedUser.eMail);
  }

}
