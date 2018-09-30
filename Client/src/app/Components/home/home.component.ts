import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
