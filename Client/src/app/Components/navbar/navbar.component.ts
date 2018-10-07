import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../node_modules/@angular/material';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  //opens pop up when login is clicked.
  openDialog() {
    const dialogReference = this.dialog.open(LoginComponent,{
      width: '600px'
    })
    
    //action needed after dialog is closed.
    dialogReference.afterClosed().subscribe(result=>{
      console.log("dialog was closed");
    });

    return false;
  }

  //opens pop up when sign up button is clicked
  openSignUp(){
    const dialogReference = this.dialog.open(SignupComponent,{width: '600px'})
    dialogReference.afterClosed().subscribe(result=>{console.log("dialog was closed");});
    return false;
  }
    
}
