import { Injectable } from '@angular/core';
import { City } from "../Components/city.model";
import { HttpClient} from "@angular/common/http";
import { CitySelectComponent } from '../Components/city-select/city-select.component';
import { MatDialogRef } from '../../../node_modules/@angular/material';

@Injectable()
export class CityService{
    public cities: City[] = [];
    private cityDialogRef: MatDialogRef<CitySelectComponent>;
constructor(private http: HttpClient) {}

//method to get cities list to populate on sign up page
public getCities(){
    return this.http.get("http://localhost:4241/cities/", { responseType: "json" });
}

public setCityDialogRef(cityDialofRef) {
    this.cityDialogRef = cityDialofRef;
}

public getCityDialogRef() {
    return this.cityDialogRef;
}
}