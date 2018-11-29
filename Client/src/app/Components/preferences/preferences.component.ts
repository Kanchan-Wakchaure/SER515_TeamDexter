import { Component, OnInit } from "@angular/core";
import { PreferenceService } from "../../Services/preference.service";
import { User } from "../../Components/user.model";
import { MatDialog } from "@angular/material";
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from "../../Services/authentication.service";

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
  public verified: Boolean = false;
  constructor(
    public snackBar: MatSnackBar,
    public preferenceService: PreferenceService,
    private cityService: CityService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = new User();

    this.getUserDetails();

    this.cityService.getCities().subscribe((response: City[]) => {
      this.cities = response;
    });

    this.genreList = [
      { id: 1, item_text: "Action" },
      { id: 2, item_text: "Adventure" },
      { id: 3, item_text: "Animation" },
      { id: 4, item_text: "Comedy" },
      { id: 5, item_text: "Crime" },
      { id: 6, item_text: "Documentary" },
      { id: 7, item_text: "Drama" },
      { id: 8, item_text: "Family" },
      { id: 9, item_text: "Fantasy" },
      { id: 10, item_text: "History" },
      { id: 11, item_text: "Horror" },
      { id: 12, item_text: "Music" },
      { id: 13, item_text: "Mystery" },
      { id: 14, item_text: "Romance" },
      { id: 15, item_text: "Science Fiction" },
      { id: 16, item_text: "TV Movie" },
      { id: 17, item_text: "Thriller" },
      { id: 18, item_text: "War" },
      { id: 19, item_text: "Western" },
    ];

    this.actorsList = [
      { id: 1, item_text: "Al Pacino" },
      { id: 2, item_text: "Angelina Jolie" },
      { id: 3, item_text: "Antonio Banderas" },
      { id: 4, item_text: "Arnold Schwarzenegger" },
      { id: 5, item_text: "Brad Pitt" },
      { id: 6, item_text: "Bruce Willis" },
      { id: 7, item_text: "Cameron Diaz" },
      { id: 8, item_text: "Catherine Zeta-Jones" },
      { id: 9, item_text: "Charlize Theron" },
      { id: 10, item_text: "Christian Bale" },
      { id: 11, item_text: "Clive Owen" },
      { id: 12, item_text: "Denzel Washington" },
      { id: 13, item_text: "Edward Norton" },
      { id: 14, item_text: "George Clooney" },
      { id: 15, item_text: "Gerard Butler" },
      { id: 16, item_text: "Guy Pearce" },
      { id: 17, item_text: "Hugh Jackman" },
      { id: 18, item_text: "Ian McKellen" },
      { id: 19, item_text: "Jack Nicholson" },
      { id: 20, item_text: "John Travolta" },
      { id: 21, item_text: "Johnny Depp" },
      { id: 22, item_text: "Kate Winslet" },
      { id: 23, item_text: "Katherine Heigl" },
      { id: 24, item_text: "Keanu Reeves" },
      { id: 25, item_text: "Keira Knightley" },
      { id: 26, item_text: "Kevin Spacey" },
      { id: 27, item_text: "Leonardo DiCaprio" },
      { id: 28, item_text: "Matt Damon" },
      { id: 29, item_text: "Meg Ryan" },
      { id: 30, item_text: "Megan Fox" },
      { id: 31, item_text: "Mel Gibson" },
      { id: 32, item_text: "Morgan Freeman" },
      { id: 33, item_text: "Nicolas Cage" },
      { id: 34, item_text: "Nicole Kidman" },
      { id: 35, item_text: "Richard Gere" },
      { id: 36, item_text: "Robert De Niro" },
      { id: 37, item_text: "Robert Downey Jr." },
      { id: 38, item_text: "Russell Crowe" },
      { id: 39, item_text: "Samuel L. Jackson" },
      { id: 40, item_text: "Sandra Bullock" },
      { id: 41, item_text: "Scarlett Johansson" },
      { id: 42, item_text: "Sean Connery" },
      { id: 43, item_text: "Simon Baker" },
      { id: 44, item_text: "Sylvester Stallone" },
      { id: 45, item_text: "Tom Cruise" },
      { id: 46, item_text: "Tom Hanks" },
      { id: 47, item_text: "Tom Hardy" },
      { id: 48, item_text: "Vin Diesel" },
      { id: 49, item_text: "Will Smith" },
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
    this.snackBar.open("User profile is updated successfully", '', { duration: 2000 });
  }

  getUserDetails() {
    this.preferenceService.getUserData().subscribe(

      (response: any) => {
        this.user = response;
        this.user.location = response.city;
        this.verified = true;
      },
      error => {
        this.user = this.authenticationService.getUser();
        if (error.error == "User not verified") {
          this.snackBar.open("Please verify the user to edit profile and set preferences", '', { duration: 200000 });
          this.verified = false;
        }
      }
    );
  }
}
