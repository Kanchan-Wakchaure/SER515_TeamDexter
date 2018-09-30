import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { Movie } from '../../Components/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  public movie: Movie;
  private movie_id: number;
  constructor(public movieService: MovieService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{this.movie_id=params['movie_id']});
    this.movieService.getMovieDetails(this.movie_id).subscribe((response: any)=>{
     debugger;
      this.movie = response;
    });
      }
}
