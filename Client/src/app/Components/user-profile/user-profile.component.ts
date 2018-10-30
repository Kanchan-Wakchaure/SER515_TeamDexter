import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';
import { PreferenceService } from '../../Services/preference.service';
import { Preference } from '../../Components/preference.model';

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

  
  public preference: Preference;
  genreList = [];
  languageList = [];
  actorsList = [];

  dropdownSettings = {};

  constructor(private router: Router,
              private cityService: CityService,
              private preferenceService: PreferenceService,
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

      this.preference = new Preference();
      this.genreList = [
        { id: 1, item_text: 'Action' },
        { id: 2, item_text: 'Drama' },
        { id: 3, item_text: 'Romance' },
        { id: 4, item_text: 'Thriller' },
        { id: 5, item_text: 'Comedy' }
      ];
  
      this.languageList = [
        { id: 1, item_text: 'English' },
        { id: 2, item_text: 'Spanish' },
        { id: 3, item_text: 'Hindi' }
      ];
  
      this.actorsList = [
        { id: 1, item_text: 'Will Smith' },
        { id: 2, item_text: 'Tom Hanks' },
        { id: 3, item_text: 'Angelina Jolie' },
        { id: 4, item_text: 'Tom Cruise' }
      ];
  
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };

      this.getPreference();
  }

  editProfile(){
    this.readonly = false;
  }

  saveChanges(){
    this.readonly = true;
    
  }

  getPreference(){
    this.preferenceService.getPreferencesByEmail(this.profile.email).subscribe((response: any) => {
      this.preference = response;
    });
  }

}
