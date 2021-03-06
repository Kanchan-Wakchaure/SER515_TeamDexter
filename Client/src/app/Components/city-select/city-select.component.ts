import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { City } from '../city.model';
import { CityService } from '../../Services/city.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css']
})
export class CitySelectComponent implements OnInit {

  public cities: City[];

  //variable that binds with html form.
  cityForm: FormGroup;
  selectedLocation: String;
  constructor(
    private auth: AuthenticationService,
    private cityService: CityService,
  ) { }

  ngOnInit() {
    if (window.sessionStorage.getItem('city') !== null) {
      this.selectedLocation = (<City>JSON.parse(window.sessionStorage.getItem('city'))).name;
    } else {
      this.selectedLocation = "select"
    }


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
    let citySelected = this.cities.find(city =>
      city.name == this.selectedLocation
    );

    window.sessionStorage.setItem('city', JSON.stringify(citySelected));
    NavbarComponent.selectedCity = citySelected.name;
    this.cityService.getCityDialogRef().close(citySelected);
  }
}
