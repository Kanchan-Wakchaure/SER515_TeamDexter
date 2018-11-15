import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators
} from "../../../../node_modules/@angular/forms";
import {
  TokenPayload,
  AuthenticationService
} from "../../Services/authentication.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  //variable that binds with html form.
  loginForm: FormGroup;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  error: String = "";
  credentials: TokenPayload = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: ""
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginData: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      })
    });

    this.emailPlaceholder = "please enter your email here";
    this.passwordPlaceholder = "please enter your password here";
  }

  //method that handles login form submit button.
  onLoginSubmit() {
    this.authenticationService.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl(this.router.url);
        this.authenticationService.getDialogRef().close();
      },
      error => {
        let errorMsg = "The username/password is invalid. Please try again";
        this.dialog.open(ErrorDialogComponent, {
          width: "500px",
          height: "210px",
          data: {
            message: errorMsg,
            ok: true
          },
          disableClose: true
        });
      }
    );
  }
}
