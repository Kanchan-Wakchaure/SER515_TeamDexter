import { Injectable } from '@angular/core';
//import { SignupComponent } from '../Components/signup/signup.component';
import { City } from "../Components/city.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class CityService{
    public cities: City[] = [];


constructor(private http: HttpClient) {}

//method to get cities list to populate on sign up page
public getCities(){
    return this.http.get("http://localhost:4241/cities/", { responseType: "json" });
}

}