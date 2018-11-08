import { Preference } from "../Components/preference.model";
import { Injectable } from "../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from "../../../node_modules/@angular/common/http";
// import { timingSafeEqual } from 'crypto';


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

    return this.http.get("http://localhost:4241/preferences/" + id, {
      responseType: "json"
    });
  }

  getPreferencesByEmail(email: string) {
    return this.http.get("http://localhost:4241/preferences/?email=" + email, {
      responseType: "json"
    });
  }

  updatePreferences(id: number, preferences: Preference) {
    this.http.put("http://localhost:4241/preferences/" + id,
      preferences, httpOptions).subscribe(results => this.var = results);
  }

  updateNewPreferences(preferences: Preference) {
    this.http.post("http://localhost:4241/preferences/", preferences, httpOptions)
      .subscribe(results => this.var = results);
  }
}
