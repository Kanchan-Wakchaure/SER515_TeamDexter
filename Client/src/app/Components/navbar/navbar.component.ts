import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialog } from '../../../../node_modules/@angular/material';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { FormControl } from '@angular/forms';
import { MovieService } from '../../Services/movie.service';
import { AuthenticationService, User } from '../../Services/authentication.service';
import { Movie } from '../movie.model';
import { CitySelectComponent } from '../city-select/city-select.component';
import { CityService } from '../../Services/city.service';
import { PreferenceService } from '../../Services/preference.service';
import { City } from '../city.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  seachForm = new FormControl('');
  partial: string = "partial";
  full: string = "full";
  movies: Movie[];
  loggedIn: boolean = false;
  user: User;
  admin: string = "Admin";
  username: String;
  public static selectedCity: String = "Select City ";
  public static test: String;
  constructor(public dialog: MatDialog, private movieService: MovieService,
    private router: Router, private authenticationService: AuthenticationService,
    private preferenceService: PreferenceService,
    private cityService: CityService) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.loadUser();
    }
    NavbarComponent.selectedCity = (<City>JSON.parse(window.sessionStorage.getItem('city'))).name;
    this.displayCityName();
  }

  //opens pop up when login is clicked.
  openDialog() {
    const dialogReference = this.dialog.open(LoginComponent, {
      width: '600px'
    })
    this.authenticationService.setDialogRef(dialogReference);
    dialogReference.afterClosed().subscribe(result => {
      this.loadUser();
    });
    return false;
  }

  //opens pop up when sign up button is clicked
  openSignUp() {
    const dialogReference = this.dialog.open(SignupComponent, { width: '600px' })

    //action needed after dialog is closed.
    dialogReference.afterClosed().subscribe(result => {
      this.loggedIn = this.authenticationService.isLoggedIn();
    });
    return false;
  }

  openCityDialog() {
    const cityDialogReference = this.dialog.open(CitySelectComponent, {
      width: '600px'
    })
    this.cityService.setCityDialogRef(cityDialogReference);
    this.cityService.getCityDialogRef().afterClosed().subscribe(
      citySelected => {
        this.displayCityName();
      }
    )
  }

  displayCityName() {
    if (window.sessionStorage.getItem('city') === null) {
      NavbarComponent.selectedCity = "Select City";
    } else {
      NavbarComponent.selectedCity = (<City>JSON.parse(window.sessionStorage.getItem('city'))).name;
    }
  }
  getSelectedCity() {
    return NavbarComponent.selectedCity;
  }
  searchMovies(movieName: string, details: string) {
    if (details == "full") {
      this.router.navigate(['search', { name: movieName, details: details }]);
    } else {
      this.movieService.getSearchedMovieList(movieName, details).subscribe((res: any) => {
        this.movies = res;
      })
    }
  }

  loadUser() {
    this.loggedIn = this.authenticationService.isLoggedIn();
    this.user = this.authenticationService.getUser();
    this.preferenceService.getUserData().subscribe(
      (response: any) => {
        this.username = response.firstname;
      },
      error => {
        this.username = this.user.firstname;
      });
  }

  navigateToHome() {
    this.router.navigate(['home']);

  }

  viewprofile() {
    this.router.navigate(['preferences']);
  }

  //logs out the user
  logOut() {
    this.authenticationService.logout();
  }

  toggleDropdown() {
    document.getElementById('dropdownMenuButton').classList.toggle('show');
  }

  findMovieNames(movieName: string, details: string) {
    if (movieName && movieName.length >= 3) {
      this.searchMovies(movieName, details);
    }
  }

  getDetails(movieId: number) {
    this.router.navigate(['movie_details', { movie_id: movieId }]);
  }
}