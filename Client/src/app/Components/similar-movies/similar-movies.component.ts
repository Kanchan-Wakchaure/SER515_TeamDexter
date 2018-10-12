import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "../movie.model";
import { Router } from "@angular/router";
import { MovieService } from "../../Services/movie.service";

@Component({
  selector: "app-similar-movies",
  templateUrl: "./similar-movies.component.html",
  styleUrls: ["./similar-movies.component.css"]
})
export class SimilarMoviesComponent implements OnInit {
  public movies: Movie[];

  @Input()
  public movieID: number;

  constructor(public movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService
      .getSimilarMovies(this.movieID)
      .subscribe((response: Movie[]) => {
        this.movies = response;
      });
  }
}
