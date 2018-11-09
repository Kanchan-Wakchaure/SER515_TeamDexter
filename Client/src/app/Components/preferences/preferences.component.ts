import { Component, OnInit } from "@angular/core";
import { PreferenceService } from "../../Services/preference.service";
import { Preference } from "../../Components/preference.model";
import {TokenPayload, AuthenticationService } from "../../Services/authentication.service";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';


@Component({
  selector: "app-preferences",
  templateUrl: "./preferences.component.html",
  styleUrls: ["./preferences.component.css"]
})
export class PreferencesComponent implements OnInit {
  public preference: Preference;
  private user_id: number;
  private email: string;
  genreList = [];
  languageList = [];
  actorsList = [];
  dropdownSettings = {};

  profile: any;

  readonly: boolean=true;
  
  public cities: City[];
 
  credentials: TokenPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    location: '' 
  };

  constructor(
    public preferenceService: PreferenceService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private cityService: CityService,
  ) {}

  ngOnInit() {
    this.preference = new Preference();
    let user: any = this.authService.getUser();
    this.preference.email = user.email;
    this.user_id = user._id;
    debugger;
    this.profile = this.authService.getUser();
    //this.getUserDetails();
    this.getPreference();

    this.cityService.getCities().subscribe((response: City[]) => {
      this.cities = response; } );

    this.genreList = [
      { id: 1, item_text: "Action" },
      { id: 2, item_text: "Drama" },
      { id: 3, item_text: "Romance" },
      { id: 4, item_text: "Thriller" },
      { id: 5, item_text: "Comedy" }
    ];

    this.languageList = [
      { id: 1, item_text: "English" },
      { id: 2, item_text: "Spanish" },
      { id: 3, item_text: "Hindi" }
    ];

    this.actorsList = [
      { id: 1, item_text: "Will Smith" },
      { id: 2, item_text: "Tom Hanks" },
      { id: 3, item_text: "Angelina Jolie" },
      { id: 4, item_text: "Tom Cruise" }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  editProfile(){
    this.readonly = false;
  }

  saveChanges(){    
    this.readonly = true;
    this.credentials = this.profile;
    this.authService.updateProfile(this.credentials).subscribe(
      () => { console.log("user updated successfully"); }, 
      (err) => { console.log("error in update") }
      );
    this.preferenceService.updatePreferences(this.user_id, this.preference);  
  }

  getUserDetails() {
    this.authService.getUserDetailsById(this.user_id).subscribe(
      (response: any)=>{
        this.profile = response;
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          width: "500px",
          height: "210px",
          data: {
            message: error.error.errorCode + " :  " + error.error.message,
            ok: true
          },
          disableClose: true
        });
      }
    );
  }

  getPreference() {
    this.preferenceService.getPreferencesById(this.user_id).subscribe(
      (response: any) => {
        this.preference = response;
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          width: "500px",
          height: "210px",
          data: {
            message: error.error.errorCode + " :  " + error.error.message,
            ok: true
          },
          disableClose: true
        });
      }
    );
  }
}
