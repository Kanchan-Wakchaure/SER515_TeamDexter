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
      this.movieService.getMovies(this.page).subscribe((response: Movie[]) => {
        this.movies = response;
      });
    }
  }

  private searchMovies() {
    this.activatedRoute.params.subscribe(params => {
      let movieName: string = params["name"];
      let details: string = params["details"];
      this.movieService
        .getSearchedMovieList(movieName, details)
        .subscribe((res: Movie[]) => {
          this.movies = res;
        });
    });
  }

  private upcomingMovies() {
    this.movieService.getUpcomingMovieList(this.page).subscribe((res: Movie[]) => {
      this.movies = res;
    });
  }

  private loadPage(id: number) {
    if(this.router.url.includes('/coming_soon'))
      this.movieService.getUpcomingMovieList(id).subscribe((response: Movie[])=> {
        this.movies = response;
      })
    else if(this.router.url.includes('/home'))
      this.movieService.getMovies(id).subscribe((response: Movie[])=> {
      this.movies = response;
    }) 
  }
}
