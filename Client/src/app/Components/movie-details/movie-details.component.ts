import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { Movie } from '../../Components/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TimeAndTheatreComponent } from '../time-and-theatre/time-and-theatre.component';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  public color = "warn";
  public movie: Movie;
  private movie_id: number;
  public link = "https://image.tmdb.org/t/p/w500/";
  public blank_profile: string = '/assets/blank-profile.png';
  video: string;

  constructor(public movieService: MovieService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe(params => { this.movie_id = params['movie_id'] });
    this.movieService.getMovieDetails(this.movie_id).subscribe((response: any) => {
      this.movie = response;
      this.video = this.make_trailer(this.movie['trailer']);
    });
  }

  make_trailer(url){
    let a = url.split('/');
    let correct = 'embed';
    a[3] = correct;
    let str = a.join('/');
    str += '?modestbranding=1&autohide=1&showinfo=0&controls=1&rel=0';
    return str;
  }

  get_image(string){
    if(!string)
      return this.blank_profile;
    else
      return this.link + string
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
