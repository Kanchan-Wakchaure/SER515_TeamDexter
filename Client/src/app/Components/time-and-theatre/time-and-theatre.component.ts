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
  
  private movie_id: number;
  public movie: Movie;
  private show_detail;
  private cinema_detail;

  day1 = [
  	{ time: '11:00', theatre: 'inox 1' },
  	{ time: '13:30', theatre: 'pvr 1' },
  	{ time: '14:45', theatre: 'big 1' },
  	{ time: '17:00', theatre: 'net 1' }

  ];
  
  day2 = [
  	{ time: '11:20', theatre: 'inox 2' },
  	{ time: '13:50', theatre: 'pvr 2' },
  	{ time: '14:00', theatre: 'big 2' },
  	{ time: '17:05', theatre: 'net 2' }

  ];

  day3 = [
  	{ time: '11:10', theatre: 'inox 3' },
  	{ time: '13:40', theatre: 'pvr 3' },
  	{ time: '14:10', theatre: 'big 3' },
  	{ time: '17:10', theatre: 'net 3' }

  ];

  constructor(public movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => { this.movie_id = params['movie_id'] });
    this.movieService.getMovieDetails(this.movie_id).subscribe((response: any) => {
      this.show_detail = response.show_detail;
      this.cinema_detail = response.cinema_detail;
    });
    
  }

  get diagnostic() { return JSON.stringify(this.show_detail); }

  attachCinema(show_detail, cinema_detail){
    for(let show of show_detail){
      let tempTheatre = "";
      for(let cinema of cinema_detail){
        if(cinema.id == show.id){
          tempTheatre = cinema.name;
          break;
        }
      }
      this.day1.push(time: show.time, theatre: tempTheatre);
    }
  }

}
