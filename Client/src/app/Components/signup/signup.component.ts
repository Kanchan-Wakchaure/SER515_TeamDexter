import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

//variable that binds with html form.
signupForm: FormGroup;
fnamePlaceholder: string;
lnamePlaceholder: string;
emailPlaceholder: string;
passwordPlaceholder : string;
requestedUser: User;
loading = false;
submitted = false;

  constructor(        
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  } 

// convenience getter for easy access to form fields
get f() { return this.signupForm.controls; }

  //method that handles login form submit button.
  onSignupSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }    

    this.loading = true;
  }
}