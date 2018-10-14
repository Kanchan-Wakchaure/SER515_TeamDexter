import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../Components/movie.model';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-time-and-theatre',
  templateUrl: './time-and-theatre.component.html',
  styleUrls: ['./time-and-theatre.component.css']
})
export class TimeAndTheatreComponent implements OnInit {
  
  public movie_id: number;
  public movie: Movie;
  day1 = [];
  day2 = [];
  day3 = [];
  tempTimes = [];
  link;

  constructor(public movieDetails: MovieDetailsComponent) { }

  ngOnInit() {

  }

  attachCinema(){
    this.movie = this.movieDetails.movie;

    for(let cinema of this.movie["cinema_detail"]){
      this.tempTimes = [];
      for(let show of this.movie["show_detail"]){
        if(cinema["id"] == show["cinema_id"]){
          let x = show["time"].split("-");
          let y = x[2].split("T");
          let z = y[1].split(":");
          let actualTime = z[0]+":"+z[1];
          this.link = show["booking_link"];
          this.tempTimes.push({
            time: actualTime
          });
        }
      }
      this.day1.push({
        theatre: cinema["name"],
        movie_link: this.link,
        times: this.tempTimes
      });
    }
  }
}
