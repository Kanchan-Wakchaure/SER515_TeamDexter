import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { TokenPayload, AuthenticationService } from '../../Services/authentication.service';
import { User } from '../user.model';
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  isSignedUp: boolean;
  isError: boolean;
  credentials: TokenPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    location: '' 
  };
  error_msg: string;
  success_msg: string;

  public cities: City[];

  //variable that binds with html form.
  signupForm: FormGroup;
  fnamePlaceholder: string;
  lnamePlaceholder: string;
  emailPlaceholder1: string;
  passwordPlaceholder1 : string;
  requestedUser: User;


  constructor(private auth: AuthenticationService, 
              private cityService: CityService,
              private router: Router) {}

  ngOnInit() {  
    
    this.signupForm = new FormGroup({
      'signupData': new FormGroup({
        'firstname': new FormControl(null,[Validators.required]),
        'lastname': new FormControl(null,[Validators.required]),
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,[Validators.required]),
        'location': new FormControl(null, [Validators.required]),
        'check': new FormControl(null, [Validators.required])
      })
    });

    this.fnamePlaceholder = "Please enter your first name here";
    this.lnamePlaceholder = "Please enter your last name here";
    this.emailPlaceholder1 = "Please enter your email here";
    this.passwordPlaceholder1 = "Please enter your password here";
    this.isSignedUp = false;
    this.isError = false;
    this.error_msg = "User already exist with this email id";
    this.success_msg = "You have registered successfully to FindMyShow application!";
    
    this.cityService.getCities().subscribe((response: City[]) => {
                                          this.cities = response; } );
  }

  OnSignup(){
    this.auth.signup(this.credentials).subscribe(
          () => { this.isSignedUp = true; }, 
          (err) => { this.isError = true; }
          );
  }
}