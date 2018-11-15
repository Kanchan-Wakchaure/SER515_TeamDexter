import { Component, OnInit, HostListener } from '@angular/core';
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
  adminEmail: string = "shi.g.bhat@gmail.com"
  constructor(public dialog: MatDialog, private movieService: MovieService,
    private router: Router, private authenticationService: AuthenticationService,
    private cityService: CityService) { }

  ngOnInit() {
    this.loadUser();
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
    const cityDialogReference = this.dialog.open(CitySelectComponent,{
      width: '600px'
    })
    this.cityService.setCityDialogRef(cityDialogReference);
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