import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { TokenPayload, AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';



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
  error: String = "";
  credentials: TokenPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    location: '' 
  };


  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    
    this.loginForm = new FormGroup({
      'loginData': new FormGroup({
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,[Validators.required])
      })
    });

    this.emailPlaceholder = "please enter your email here";
    this.passwordPlaceholder = "please enter your password here";
     
  }

  //method that handles login form submit button.
  onLoginSubmit() {
    this.authenticationService.login(this.credentials).subscribe(()=> {
      this.router.navigateByUrl('/home');
      console.log(this.authenticationService.getUser().location)
      this.authenticationService.getDialogRef().close();
    }, (error) => {
      this.error = "The username/password is invalid. Please try again"
    });
  }

}
