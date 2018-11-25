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

/*     this.languageList = [
      { id: 1, item_text: "English" },
      { id: 2, item_text: "Spanish" },
      { id: 3, item_text: "Hindi" }
    ]; */

    this.actorsList = [
      { id: 2, item_text: "Al Pacino" },
      { id: 1, item_text: "Angelina Jolie" },
      { id: 1, item_text: "Antonio Banderas" },
      { id: 1, item_text: "Arnold Schwarzenegger" },      
      { id: 7, item_text: "Brad Pitt" },
      { id: 1, item_text: "Bruce Willis" },
      { id: 2, item_text: "Cameron Diaz" },
      { id: 1, item_text: "Catherine Zeta-Jones" },    
      { id: 1, item_text: "Charlize Theron" },
      { id: 1, item_text: "Christian Bale" },        
      { id: 1, item_text: "Clive Owen" },    
      { id: 5, item_text: "Denzel Washington" },
      { id: 1, item_text: "Edward Norton" },
      { id: 1, item_text: "George Clooney" },
      { id: 1, item_text: "Gerard Butler" },
      { id: 1, item_text: "Guy Pearce" },
      { id: 1, item_text: "Hugh Jackman" },
      { id: 1, item_text: "Ian McKellen" },
      { id: 1, item_text: "Jack Nicholson" },
      { id: 1, item_text: "John Travolta" },
      { id: 1, item_text: "Johnny Depp" },
      { id: 1, item_text: "Kate Winslet" },
      { id: 3, item_text: "Katherine Heigl" },
      { id: 1, item_text: "Keanu Reeves" },
      { id: 1, item_text: "Keira Knightley" },              
      { id: 4, item_text: "Kevin Spacey" },
      { id: 1, item_text: "Leonardo DiCaprio" },
      { id: 1, item_text: "Matt Damon" },
      { id: 1, item_text: "Meg Ryan" },
      { id: 1, item_text: "Megan Fox" },
      { id: 1, item_text: "Mel Gibson" },
      { id: 1, item_text: "Morgan Freeman" },      
      { id: 1, item_text: "Nicolas Cage" },
      { id: 1, item_text: "Nicole Kidman" },      
      { id: 1, item_text: "Richard Gere" },           
      { id: 3, item_text: "Robert De Niro" },
      { id: 1, item_text: "Robert Downey Jr." },
      { id: 6, item_text: "Russell Crowe" },
      { id: 1, item_text: "Samuel L. Jackson" },
      { id: 1, item_text: "Sandra Bullock" },   
      { id: 1, item_text: "Scarlett Johansson" }, 
      { id: 1, item_text: "Sean Connery" },  
      { id: 1, item_text: "Simon Baker" },        
      { id: 1, item_text: "Sylvester Stallone" },
      { id: 1, item_text: "Tom Cruise" },
      { id: 1, item_text: "Tom Hanks" },  
      { id: 1, item_text: "Tom Hardy" },  
      { id: 1, item_text: "Vin Diesel" },  
      { id: 1, item_text: "Will Smith" },                                 
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
