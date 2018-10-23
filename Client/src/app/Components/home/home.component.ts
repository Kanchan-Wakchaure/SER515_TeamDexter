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
  public showSlider: boolean = true;
  page: number = 1;

  constructor(
    public movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.router.url.includes("/search")) {
      this.showSlider = false;
      this.searchMovies();
    } else if (this.router.url.includes("/coming_soon")) {
      this.showSlider = false;
      this.upcomingMovies();
    } else {
      this.showSlider = true;
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
          this.movies = res;
        });
    });
  }

  private upcomingMovies() {
    this.movieService.getUpcomingMovieList().subscribe((res: Movie[]) => {
      this.movies = res;
    });
  }
}
