import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-and-theatre',
  templateUrl: './time-and-theatre.component.html',
  styleUrls: ['./time-and-theatre.component.css']
})
export class TimeAndTheatreComponent implements OnInit {
  
  public movie_id: number;
  public movie: any;
  day1 = [];
  day2 = [];
  day3 = [];
  tempTimes = [];
  link;

  constructor(public movieService: MovieService, private route: ActivatedRoute) { }

  attachCinema(movie: any){
    for(let cinema of movie["cinema_detail"]){
      this.tempTimes = [];
      for(let show of movie["show_detail"]){
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

  ngOnInit() {

    this.route.params.subscribe(params => { this.movie_id = params['movie_id'] });
    this.movieService.getMovieDetails(this.movie_id).subscribe( (response: any) => {
      this.movie = response;
    });
  }
}
