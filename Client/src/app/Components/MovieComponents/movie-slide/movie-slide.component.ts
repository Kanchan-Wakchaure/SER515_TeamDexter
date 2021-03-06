import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-slide',
  templateUrl: './movie-slide.component.html',
  styleUrls: ['./movie-slide.component.css']
})
export class MovieSlideComponent implements OnInit {

  //variable to track slide interval.
  timeInterval: any;
  
  //array of popular movies that needs to be seen on slider.
   popularMovies: {sNumber: number, imageUrl: string}[] = [
    {sNumber: 1 , imageUrl: "https://ohmy.disney.com/wp-content/uploads/2018/04/solo-thumb.jpg"},
    {sNumber: 2 , imageUrl: "https://i.ytimg.com/vi/XsGs_WvAQxw/maxresdefault.jpg" },
    {sNumber: 3 , imageUrl: "https://i2.wp.com/www.ageratingjuju.com/wp-content/uploads/2018/08/A-Simple-Favor-Age-Rating-2018-Movie-Poster-Images-and-Wallpapers.jpg?fit=1802%2C944&ssl=1"},
    {sNumber: 4 , imageUrl: "https://cdn.traileraddict.com/content/screencap/121677.jpg"}
  ];
  
  currentMovie: {sNumber: number, imageUrl: string}=this.popularMovies.find(x=>x.sNumber===1);
  constructor() {
    
   }

  ngOnInit() {
    this.startSliderInterval(); 
  }

  /*
  * The method start the interval that traverses between images in regular intervals
  */
  startSliderInterval() {
    this.timeInterval = setInterval(()=> {
      if(this.currentMovie.sNumber==4) {
        this.currentMovie=this.popularMovies.find(x=>x.sNumber===1);
      } else {
        this.currentMovie = this.popularMovies.find(x=>x.sNumber===this.currentMovie.sNumber+1);
      }
    },5000);
  }

  /*
  * The method changes slides when "prev", "next" are clicked
  * @param: slideNumber: the sNumber of the image that needs to be displayed
  */
  changeSlide(slideNumber: number) {
    if(this.currentMovie.sNumber+slideNumber==0) {
      this.currentMovie = this.popularMovies.find(x=>x.sNumber===4);
    }else if(this.currentMovie.sNumber+slideNumber==5) {
      this.currentMovie = this.popularMovies.find(x=>x.sNumber===1);
    } else {
      this.currentMovie = this.popularMovies.find(x=>x.sNumber===this.currentMovie.sNumber+slideNumber);
    }

  

    //reset slide interval.
    clearInterval(this.timeInterval);
    this.startSliderInterval();
  }

  /*
  * The method changes slides when "dots" are clicked.
  * @param: slideNumber: the sNumber of the image that needs to be displayed
  */
 jumpSlide(slideNumber: number) {
  this.currentMovie = this.popularMovies.find(x=>x.sNumber===slideNumber);
  
  //reset slide interval.
  clearInterval(this.timeInterval);
  this.startSliderInterval();
}

}
