import { Movie } from "../Components/movie.model";
import { Injectable } from "../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from "../../../node_modules/@angular/common/http";
// import { timingSafeEqual } from 'crypto';

/*
* A service Class that acts as centralized repository for handling movie data.
* @Author: Sai Saran Kandimalla.
* @Author: Shilpa Bhat
* @version 1: created on 09/18/2018.
*/
@Injectable()
export class MovieService {
  //Sample data for movies.
  public movies: Movie[] = [];

  constructor(private http: HttpClient) {}

  /* A getter method to get movies.
    * @returns movies: Movie[].
    */
  getMovies() {
    return this.http.get("http://localhost:4241/", { responseType: "json" });
  }

  /* A getter method to get movie details */
  getMovieDetails(id: number) {
    return this.http.get("http://localhost:4241/movie/" + id, {
      responseType: "json"
    });
  }

  getSearchedMovieList(movieName: string) {
    return this.http.get(
      "http://localhost:4241/movies/?type=search&name=" + movieName
    );
  }

  getUpcomingMovieList() {
    return this.http.get("http://localhost:4241/movies/?type=upcoming", {
      responseType: "json"
    });
  }
}
