import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../Services/authentication.service";
import "rxjs/add/operator/filter";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
@Component({
  selector: "app-activation",
  templateUrl: "./activation.component.html"
})
export class ActivationComponent implements OnInit {
  code: string;
  successmessage: string;
  redirectmessage: string;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.filter(params => params.code).subscribe(params => {
      this.code = params.code;
      this.authenticationService.activate(this.code).subscribe(
        (response: any) => {
          this.successmessage = response.message;
          this.redirectmessage = "redirecting you to home page....";
          setTimeout(() => {
            this.router.navigate(["/home"]);
          }, 2000);
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
    });
  }
}
