import { Component, OnInit } from "@angular/core";
import { PreferenceService } from "../../Services/preference.service";
import { User } from "../../Components/user.model";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: "app-preferences",
  templateUrl: "./preferences.component.html",
  styleUrls: ["./preferences.component.css"]
})
export class PreferencesComponent implements OnInit {
  public user: User;

  genreList = [];
  languageList = [];
  actorsList = [];
  dropdownSettings = {};

  readonly: boolean = true;

  public cities: City[];

  constructor(
    public snackBar: MatSnackBar, 
    public preferenceService: PreferenceService,
    private dialog: MatDialog,
    private cityService: CityService,
  ) { }

  ngOnInit() {
    this.user = new User();

    this.getUserDetails();

    this.cityService.getCities().subscribe((response: City[]) => {
      this.cities = response;
    });

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

  editProfile() {
    this.readonly = false;
  }

  saveChanges() {
    this.readonly = true;
    this.preferenceService.updateUserData(this.user);
    this.snackBar.open("User profile is updated successfully", '', {duration: 2000});

  }

  getUserDetails() {
    this.preferenceService.getUserData().subscribe(
      (response: any) => {
        this.user = response;
        this.user.location = response.city;        
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
