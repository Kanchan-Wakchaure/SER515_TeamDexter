import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: any;
  userprofileForm: FormGroup;
  fnameholder: string;
  lnameholder: string;
  emailholder: string;
  locationholder: string;

  constructor(private router: Router,
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
    this.fnameholder = this.profile.firstName;
    this.lnameholder = this.profile.lastname;
    this.emailholder = this.profile.email; 
    this.locationholder = this.profile.location;
  }

}
