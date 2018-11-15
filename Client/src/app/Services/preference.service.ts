import { Preference } from "../Components/preference.model";
import { Injectable } from "../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
} from "../../../node_modules/@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class PreferenceService {

  public preference: Preference;
  public var;

  constructor(private http: HttpClient) { }

  getPreferencesById(id: number) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': 'Bearer ' + token
      })
    };
    return this.http.get("http://localhost:4241/users/", {
      responseType: "json",
      headers: httpOptions.headers
    });
  }

  updatePreferences(id: number, profile) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': 'Bearer ' + token
      })
    };
    this.http.put("http://localhost:4241/users/",
      profile, httpOptions).subscribe(results => this.var = results);
  }

}
