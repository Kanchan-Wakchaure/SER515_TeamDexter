import { Component } from '@angular/core';
import { CityService } from './Services/city.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  
  
  constructor(private cityService: CityService) { }

  ngOnInit() {
   
  }
}