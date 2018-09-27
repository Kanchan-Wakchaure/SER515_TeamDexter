import { Component } from '@angular/core';

import { MovieService } from './Services/movie.service';
import { Movie } from './Components/movie.model';
import { Observable } from '../../node_modules/rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  

  public movies: Movie[];
  
  constructor(public movieService: MovieService) { }

  ngOnInit() {
   this.movieService.getMovies().subscribe(
     
    (response: Movie[])=> {
      console.log(response);
      this.movies = response;
      console.log(this.movies[0]);
    }
  
  );
  
  }
}
