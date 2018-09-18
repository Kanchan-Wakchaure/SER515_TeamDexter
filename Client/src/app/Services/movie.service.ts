import { Injectable } from '@angular/core';
import {Movie} from '../Components/movie.model';

@Injectable()
export class MovieService {

  //Sample data for movies.
  public movies: Movie[] = [
    new Movie("A Simple Favour","Comedy","https://in.bmscdn.com/iedb/movies/images/website/poster/large/a-simple-favor-et00079789-14-07-2018-03-31-59.jpg"),
    new Movie("The Predator","Thriller/Science Fiction","https://mir-s3-cdn-cf.behance.net/project_modules/1400/ca0bd049359763.58b2bd364fb88.jpg"),
    new Movie("The Nun","Horror","https://m.media-amazon.com/images/M/MV5BMjM3NzQ5NDcxOF5BMl5BanBnXkFtZTgwNzM4MTQ5NTM@._V1_.jpg"),
    new Movie("A Star is Born","Comedy","http://www.blackfilm.com/read/wp-content/uploads/2018/06/A-Star-Is-Born-poster-1.jpg"),
    new Movie("Alpha","Action","https://cdn2.bigcommerce.com/server5000/yshlhd/products/11960/images/134761/full.alpha_27475__02779.1533498340.1280.1280.jpg?c=2"),
  ]; 
  constructor() { }

  /* A getter method to get movies.
  * @returns movies: Movie[].
  */
  getMovies() {
    return this.movies;
  }

}
