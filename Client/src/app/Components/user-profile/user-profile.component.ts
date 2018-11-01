import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';
import { Router } from "@angular/router";
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: any;
  userprofileForm: FormGroup;
  readonly: boolean=true;
  
  public cities: City[];
 
  credentials: TokenPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    location: '' 
  };

  constructor(private route: Router,
              private cityService: CityService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.userprofileForm = new FormGroup({
      'profileData': new FormGroup({
        'firstname': new FormControl(null),
        'lastname': new FormControl(null),
        'email': new FormControl(null),
        'location': new FormControl(null),
      })
    });
    this.profile =  this.authService.getUser();

    this.cityService.getCities().subscribe((response: City[]) => {
      this.cities = response; } );

  }

  editProfile(){
    this.readonly = false;
  }

  saveChanges(){    
    this.readonly = true;
    this.credentials = this.profile;
    this.authService.updateProfile(this.credentials).subscribe(
      () => { console.log("user updated successfully") }, 
      (err) => { console.log("error in update") }
      );
  }

}
