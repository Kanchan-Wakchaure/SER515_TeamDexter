import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialog } from '../../../../node_modules/@angular/material';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { FormControl } from '@angular/forms';
import { MovieService } from '../../Services/movie.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  seachForm = new FormControl('');
  
  
  constructor(public dialog: MatDialog, private movieService: MovieService,
    private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  //opens pop up when login is clicked.
  openDialog() {
    const dialogReference = this.dialog.open(LoginComponent, {
      width: '600px'
    })
    this.authenticationService.setDialogRef(dialogReference);
    return false;
  }

  //opens pop up when sign up button is clicked
  openSignUp() {
    const dialogReference = this.dialog.open(SignupComponent, { width: '600px' })

    //action needed after dialog is closed.
    dialogReference.afterClosed().subscribe(result => { console.log("dialog was closed"); });
    return false;
  }

  searchMovies(movieName: string) {
    this.router.navigate(['search', { name: movieName }]);
  }

  navigateToHome() {
    this.router.navigate(['home']);

  }
  
  //logs out the user
  logOut() {
    this.authenticationService.logout();
  }
  
  toggleDropdown() {
    document.getElementById('dropdownMenuButton').classList.toggle('show');
  }
}