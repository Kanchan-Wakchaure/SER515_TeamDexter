import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "../movie.model";
import { Router } from "@angular/router";
import { MovieService } from "../../Services/movie.service";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

@Component({
  selector: "app-similar-movies",
  templateUrl: "./similar-movies.component.html",
  styleUrls: ["./similar-movies.component.css"]
})
export class SimilarMoviesComponent implements OnInit {
  public movies: Movie[];

  @Input()
  public movieID: number;

  constructor(
    public movieService: MovieService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.movieService.getSimilarMovies(this.movieID).subscribe(
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
  getDetails(id: string){
    if(id != '')
      this.router.navigate(['movie_details', {movie_id: id}]);
  }
}
