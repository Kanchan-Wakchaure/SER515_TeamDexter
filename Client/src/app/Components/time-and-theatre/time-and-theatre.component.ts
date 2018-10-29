import { Component, OnInit } from '@angular/core';
import { TimeAndTheatre } from '../timeandtheatre.model'
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-time-and-theatre',
  templateUrl: './time-and-theatre.component.html',
  styleUrls: ['./time-and-theatre.component.css']
})
export class TimeAndTheatreComponent implements OnInit {
  
  public data: TimeAndTheatre;
  public date: number = 0;
  day1 = [];
  day2 = [];
  day3 = [];
  tempTimes1 = [];
  tempTimes2 = [];
  tempTimes3 = [];


  constructor(public movieService: MovieService) {}

  ngOnInit() {
    
    this.movieService.getShowTimes(3).subscribe((response: any) => {
      this.data = response;
      this.attachCinema();
    });
  }

  get diagnostic() { return JSON.stringify(this.data['show_detail']); }

  attachCinema(){
    for(let cinema of this.data.cinema_detail){
      this.tempTimes1 = [];
      this.tempTimes2 = [];
      this.tempTimes3 = [];
      for(let show of this.data.show_detail){
        if(cinema["id"] == show["cinema_id"]){
          let x = show["time"].split("-");
          let y = x[2].split("T");
          let z = y[1].split(":");
          let actualTime = z[0]+":"+z[1];

          if(this.date == 0)
            this.date = +y[0];

          if(y[0] == this.date){
            this.tempTimes1.push({
              time: actualTime,
              booking_link: show["booking_link"]
            });
          }

          else if(y[0] == (this.date+1)){
            this.tempTimes2.push({
              time: actualTime,
              booking_link: show["booking_link"]
            });
          }

          else if(y[0] == (this.date+2)){
            this.tempTimes3.push({
              time: actualTime,
              booking_link: show["booking_link"]
            });
          }
        }
      }
      if(this.tempTimes1.length != 0){
        this.day1.push({
          theatre: cinema["name"],
          times: this.tempTimes1
        });
      }
      
      if(this.tempTimes2.length != 0){
        this.day2.push({
          theatre: cinema["name"],
          times: this.tempTimes2
        });
      }
      
      if(this.tempTimes3.length != 0){
        this.day3.push({
          theatre: cinema["name"],
          times: this.tempTimes3
        });
      }
      
    }
  }
}
