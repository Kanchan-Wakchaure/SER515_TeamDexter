import { Injectable } from '@angular/core';
import {Movie} from '../Components/movie.model';

@Injectable()
export class MovieService {

  public movies: Movie[] = [
    new Movie("A Simple Favour",["Comedy"],"https://in.bmscdn.com/iedb/movies/images/website/poster/large/a-simple-favor-et00079789-14-07-2018-03-31-59.jpg"),

  ]; 
  constructor() { }
}
