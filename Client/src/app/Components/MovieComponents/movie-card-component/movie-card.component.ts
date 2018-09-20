import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})


/*
* A class that acts as controller for movie-card-component.
* @Author: Sai Saran Kandimalla.
* @version 1: created on 09/18/2018.
*/
export class MovieCardComponent implements OnInit {

  @Input() public movie: Movie;
  
  
  constructor() { }

  ngOnInit() {
  }

}
