import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css']
})
export class CitySelectComponent implements OnInit {
  
  public cities: City[];

  //variable that binds with html form.
  cityForm: FormGroup;
  selectedLocation: string;
  constructor(
    private auth: AuthenticationService,
    private cityService: CityService,
  ) {}

  ngOnInit() {
    
    this.cityService.getCities().subscribe((response: City[]) => {
      this.cities = response;
      this.cities.sort((one, two) => (one.name < two.name ? -1 : 1));
    });

    this.cityForm = new FormGroup({
      cityData: new FormGroup({
        location: new FormControl(null, [Validators.required]),
      })
    });

  }

  OnSelect() {
    let citySelected = this.cities.find( city => 
        city.name == this.selectedLocation
    );
    
    window.sessionStorage.setItem('city', JSON.stringify(citySelected));
    this.cityService.getCityDialogRef().close();
  }
}
