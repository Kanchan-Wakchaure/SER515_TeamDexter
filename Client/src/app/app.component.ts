import { Component } from '@angular/core';

import { MovieService } from './Services/movie.service';
import { Movie } from './Components/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  

  public movies: Movie[];
  constructor(public movieService: MovieService) { }

  ngOnInit() {
  this.movies = this.movieService.getMovies();
  }
}
