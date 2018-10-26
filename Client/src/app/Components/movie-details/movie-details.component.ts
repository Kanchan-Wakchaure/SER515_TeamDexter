import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { Movie } from '../../Components/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { TimeAndTheatreComponent } from '../time-and-theatre/time-and-theatre.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  public movie: Movie;
  private movie_id: number;
  constructor(public movieService: MovieService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => { this.movie_id = params['movie_id'] });
    this.movieService.getMovieDetails(this.movie_id).subscribe((response: any) => {
      this.movie = response;
    });
  }

  openDialog() {
    const dialogReference = this.dialog.open(TimeAndTheatreComponent, {
      width: '780px',
      height: '500px',
    })
    dialogReference.afterClosed().subscribe(result => { console.log("dialog was closed"); });
    return false;
  }
}
