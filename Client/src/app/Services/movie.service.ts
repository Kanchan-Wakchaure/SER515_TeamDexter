import {Movie} from '../Components/movie.model';
import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';


/*
* A service Class that acts as centralized repository for handling movie data.
* @Author: Sai Saran Kandimalla.
* @version 1: created on 09/18/2018.
*/
@Injectable()
export class MovieService {

  //Sample data for movies.
  public movies: Movie[]=[];   
  
  constructor(private http: HttpClient) { }

  /* A getter method to get movies.
  * @returns movies: Movie[].
  */
  getMovies()  {
    
    return this.http.get("http://localhost:4241/",{responseType:'json'});
    
  }

  

}
