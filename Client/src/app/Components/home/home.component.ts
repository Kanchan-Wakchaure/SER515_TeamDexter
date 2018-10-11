import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Movie } from "../movie.model";
import { MovieService } from "../../Services/movie.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public movies: Movie[];

  constructor(
    public movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url.includes("/search")) {
      this.searchMovies();
    } else if (this.router.url.includes("/coming_soon")) {
      this.upcomingMovies();
    } else {
      this.movieService.getMovies().subscribe((response: Movie[]) => {
        this.movies = response;
      });
    }
  }

  private searchMovies() {
    this.activatedRoute.params.subscribe(params => {
      let movieName: string = params["name"];
      this.movieService
        .getSearchedMovieList(movieName)
        .subscribe((res: Movie[]) => {
          debugger;
          this.movies = res;
        });
    });
  }

  private upcomingMovies() {
    this.activatedRoute.params.subscribe(params => {
      this.movieService.getUpcomingMovieList().subscribe((res: Movie[]) => {
        debugger;
        this.movies = res;
      });
    });
  }
}
