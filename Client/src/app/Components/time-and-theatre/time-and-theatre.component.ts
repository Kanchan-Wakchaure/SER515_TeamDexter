import { Component, OnInit } from "@angular/core";
import { TimeAndTheatre } from "../timeandtheatre.model";
import { MovieService } from "../../Services/movie.service";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

@Component({
  selector: "app-time-and-theatre",
  templateUrl: "./time-and-theatre.component.html",
  styleUrls: ["./time-and-theatre.component.css"]
})
export class TimeAndTheatreComponent implements OnInit {
  public data: TimeAndTheatre;
  public date: number = 0;
  public today: Date;
  public tomorrow: Date;
  public day_after: Date;
  day1 = [];
  day2 = [];
  day3 = [];
  tempTimes1 = [];
  tempTimes2 = [];
  tempTimes3 = [];


  constructor(public movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit() {
    this.movieService.getShowTimes(3).subscribe(
      (response: any) => {
        this.data = response;
        this.attachCinema();
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

  get diagnostic() {
    return JSON.stringify(this.data["show_detail"]);
  }

  attachCinema() {
    for (let cinema of this.data.cinema_detail) {
      this.tempTimes1 = [];
      this.tempTimes2 = [];
      this.tempTimes3 = [];
      for (let show of this.data.show_detail) {
        if (cinema["id"] == show["cinema_id"]) {
          let x = show["time"].split("-");
          let y = x[2].split("T");
          let z = y[1].split(":");
          let actualTime = z[0] + ":" + z[1];
          let temp_date = new Date(show["time"]);

          if (this.date == 0) {
            this.date = 1;
            this.today = new Date(show["time"]);
            this.tomorrow = new Date(this.today);
            this.tomorrow.setDate(this.tomorrow.getDate() + 1);
            this.day_after = new Date(this.today);
            this.day_after.setDate(this.day_after.getDate() + 2);
          }

          if (temp_date.getDate() == this.today.getDate()) {
            this.tempTimes1.push({
              time: actualTime,
              booking_link: show["booking_link"]
            });
          } else if (temp_date.getDate() == this.tomorrow.getDate()) {
            this.tempTimes2.push({
              time: actualTime,
              booking_link: show["booking_link"]
            });
          } else if (temp_date.getDate() == this.day_after.getDate()) {
            this.tempTimes3.push({
              time: actualTime,
              booking_link: show["booking_link"]
            });
          }
        }
      }
      if (this.tempTimes1.length != 0) {
        this.day1.push({
          theatre: cinema["name"],
          times: this.tempTimes1
        });
      }

      if (this.tempTimes2.length != 0) {
        this.day2.push({
          theatre: cinema["name"],
          times: this.tempTimes2
        });
      }

      if (this.tempTimes3.length != 0) {
        this.day3.push({
          theatre: cinema["name"],
          times: this.tempTimes3
        });
      }
    }
  }
}
