import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Movie } from "../movie.model";
import { MovieService } from "../../Services/movie.service";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public movies: Movie[];
  public showSlider: boolean = true;
  page: number = 1;
  public emptyFlag: boolean = false;
  public paginationFlag: boolean = true;

  @Input() public message: String;

  constructor(
    public movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.router.url.includes("/search")) {
      this.showSlider = false;
      this.searchMovies();
    } else if (this.router.url.includes("/coming_soon")) {
      this.showSlider = false;
      this.upcomingMovies();
    } else if (this.router.url.includes("/now_playing")) {
      this.showSlider = false;
      this.nowPlayingMovies();
    } else if (this.router.url.includes("/recommended")) {
      this.showSlider = false;
      this.recommendedMovies();
    } else {
      this.showSlider = true;
      this.movieService.getMovies(this.page).subscribe(
        (response: Movie[]) => {
          this.movies = response;
        },
        error => {
          this.dialog.open(ErrorDialogComponent, {
            width: "500px",
            height: "210px",
            data: {
              message: error.error.errorCode + " :  " + error.error.message,
              ok: true
            },
            disableClose: true
          });
        }
      );
    }
  }

  private searchMovies() {
    this.activatedRoute.params.subscribe(params => {
      let movieName: string = params["name"];
      let details: string = params["details"];
      this.paginationFlag = false;
      this.movieService.getSearchedMovieList(movieName, details).subscribe(
        (res: Movie[]) => {
          this.movies = res;
        },
        error => {
          this.dialog.open(ErrorDialogComponent, {
            width: "500px",
            height: "210px",
            data: {
              message: error.error.errorCode + " :  " + error.error.message,
              ok: true
            },
            disableClose: true
          });
        }
      );
    });
  }

  private upcomingMovies() {
    this.movieService.getUpcomingMovieList(this.page).subscribe(
      (res: Movie[]) => {
        this.movies = res;
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          width: "500px",
          height: "210px",
          data: {
            message: error.error.errorCode + " :  " + error.error.message,
            ok: true
          },
          disableClose: true
        });
      }
    );
  }

  private nowPlayingMovies() {
    this.movieService.getNowPlayingMovieList(this.page).subscribe(
      (res: Movie[]) => {
        this.movies = res;
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          width: "500px",
          height: "210px",
          data: {
            message: error.error.errorCode + " :  " + error.error.message,
            ok: true
          },
          disableClose: true
        });
      }
    );
  }
  private recommendedMovies() {
    this.movieService.getRecommendedMovieList().subscribe(
      (res: Movie[]) => {
        if (res.length == 0) {
          this.emptyFlag = true;
          this.message =
            "Sorry, No recommendations found for your preferences at this time";
        } else {
          this.movies = res;
        }
        this.paginationFlag = false;
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          width: "500px",
          height: "210px",
          data: {
            message: error.error.errorCode + " :  " + error.error.message,
            ok: true
          },
          disableClose: true
        });
      }
    );
  }
  private loadPage(id: number) {
    if (this.router.url.includes("/coming_soon"))
      this.movieService.getUpcomingMovieList(id).subscribe(
        (response: Movie[]) => {
          this.movies = response;
        },
        error => {
          this.dialog.open(ErrorDialogComponent, {
            width: "500px",
            height: "210px",
            data: {
              message: error.error.errorCode + " :  " + error.error.message,
              ok: true
            },
            disableClose: true
          });
        }
      );
    else if (this.router.url.includes("/home"))
      this.movieService.getMovies(id).subscribe(
        (response: Movie[]) => {
          this.movies = response;
        },
        error => {
          this.dialog.open(ErrorDialogComponent, {
            width: "500px",
            height: "210px",
            data: {
              message: error.error.errorCode + " :  " + error.error.message,
              ok: true
            },
            disableClose: true
          });
        }
      );
    window.scrollTo(0, 0);
  }
}
