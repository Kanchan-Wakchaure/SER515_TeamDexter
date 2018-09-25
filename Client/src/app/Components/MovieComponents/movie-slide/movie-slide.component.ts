import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-slide',
  templateUrl: './movie-slide.component.html',
  styleUrls: ['./movie-slide.component.css']
})
export class MovieSlideComponent implements OnInit {

  
  
  popularMovies: {sNumber: number, imageUrl: string}[] = [
    {sNumber: 1 , imageUrl: "https://3.bp.blogspot.com/-1hXvJeWAWGY/WUDHSFbd4HI/AAAAAAAAAOc/9NvGkXxRGlERV8VSWtw7-CVw-YYTfmsKACLcBGAs/s1600/A153L.jpg"},
  ];
  
  currentMovie: {sNumber: number, imageUrl: string}=this.popularMovies.find(x=>x.sNumber===1);
  constructor() { }

  ngOnInit() {
  }

}
