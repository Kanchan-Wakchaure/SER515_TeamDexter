import { Movie } from "../Components/movie.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { City } from "../Components/city.model";
import { AuthenticationService } from "../Services/authentication.service";
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
  private movie_id: number;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  /* A getter method to get movies.
   * @returns movies: Movie[].
   */
  getMovies(id: number) {
    return this.http.get("http://localhost:4241/movies/?page=" + id, {
      responseType: "json"
    });
  }

  /* A getter method to get movie details */
  getMovieDetails(id: number) {
    this.movie_id = id;
    return this.http.get("http://localhost:4241/movies/" + id, {
      responseType: "json"
    });
  }

  getSearchedMovieList(movieName: string, details: string) {
    return this.http.get(
      "http://localhost:4241/movies/?type=search&name=" +
        movieName +
        "&details=" +
        details
    );
  }

  getUpcomingMovieList(id: number) {
    return this.http.get(
      "http://localhost:4241/movies/?type=upcoming&page=" + id,
      {
        responseType: "json"
      }
    );
  }

  getSimilarMovies(id: number) {
    return this.http.get(
      "http://localhost:4241/movies/" + id + "/?type=similar",
      {
        responseType: "json"
      }
    );
  }

  getShowTimes(days: number) {
    var city: City = <City>JSON.parse(window.sessionStorage.getItem("city"))
    
    return this.http.get(
      "http://localhost:4241/showtimes/" +
        this.movie_id +
        "?date=" +
        days +
        "&city=" +
        city.id,
      {
        responseType: "json"
      }
    );
  }
  getRecommendedMovieList() {
    let user: any = this.authService.getUser();
    console.log(user._id);
    return this.http.get(
      "http://localhost:4241/movies/?type=recommended&userId=" + user._id,
      {
        responseType: "json"
      }
    );
  }

  getNowPlayingMovieList(id: number) {
    return this.http.get(
      "http://localhost:4241/movies/?type=nowplaying&page=" + id,
      {
        responseType: "json"
      }
    );
  }
}
