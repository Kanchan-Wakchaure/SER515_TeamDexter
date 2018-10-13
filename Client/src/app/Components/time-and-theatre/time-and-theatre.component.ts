import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { Movie } from '../movie.model';
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

  constructor(public movieService: MovieService, private route: ActivatedRoute) { }

  attachCinema(movie: any){
    for(let show of movie["show_detail"]){
      let tempTheatre: string;
      for(let cinema of movie["cinema_detail"]){
        if(cinema["id"] == show["cinema_id"]){
          tempTheatre = cinema["name"];
          break;
        }
      }
      this.day1.push({
        time: show["time"],
        theatre: tempTheatre
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
