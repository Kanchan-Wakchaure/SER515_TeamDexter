import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../Services/authentication.service";
import "rxjs/add/operator/filter";
@Component({
  selector: "app-activation",
  templateUrl: "./activation.component.html"
  //styleUrls: ["./activation.component.css"]
})
export class ActivationComponent implements OnInit {
  code: string;
  successmessage: string;
  redirectmessage: string;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.filter(params => params.code).subscribe(params => {
      console.log(params); // {order: "popular"}

      this.code = params.code;
      console.log(this.code); // popular
      this.authenticationService
        .activate(this.code)
        .subscribe((response: any) => {
          console.log(response);
          this.successmessage = response.message;
          this.redirectmessage = "redirecting you to home page....";
          setTimeout(() => {
            this.router.navigate(["/home"]);
          }, 2000);
        });
    });
  }
}
