import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { TokenPayload, AuthenticationService } from '../../Services/authentication.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  credentials: TokenPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    location: '' 
  };

  //variable that binds with html form.
  signupForm: FormGroup;
  fnamePlaceholder: string;
  lnamePlaceholder: string;
  emailPlaceholder1: string;
  passwordPlaceholder1 : string;
  requestedUser: User;


  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {  
    
    this.signupForm = new FormGroup({
      'signupData': new FormGroup({
        'firstname': new FormControl(null,[Validators.required]),
        'lastname': new FormControl(null,[Validators.required]),
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,[Validators.required]),
        'check': new FormControl(null, [Validators.required])
      })
    });

    this.fnamePlaceholder = "Please enter your first name here";
    this.lnamePlaceholder = "Please enter your last name here";
    this.emailPlaceholder1 = "Please enter your email here";
    this.passwordPlaceholder1 = "Please enter your password here";
  }

/*   get check(){
    return this.signupForm.get('signupData.check');
  }
 */
  OnSignup(){
    this.auth.signup(this.credentials).subscribe(
          () => { this.router.navigateByUrl('/profile'); }, 
          (err) => { console.error(err); }
          );
  }

}