import { Preferences } from "../Components/preferences.model";
import { Injectable } from "../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from "../../../node_modules/@angular/common/http";
// import { timingSafeEqual } from 'crypto';


@Injectable()
export class PreferenceService {

  public preference: Preferences;

  constructor(private http: HttpClient) {}

  getPreferencesById(id: number) {

    return this.http.get("http://localhost:4241/preferences/" +id, {
      responseType: "json"
    });
  }

  getPreferencesByEmail() {
    return this.http.get("http://localhost:4241/preferences/", {
      responseType: "json"
    });
  }

  updatePreferences(id: number, preferences: Preferences) {
    this.http.post("http://localhost:4241/preferences/"+ id, 
      preferences);
  }

  updateNewPreferences(preferences: Preferences) {
    this.http.post("http://localhost:4241/preferences/", preferences);
  }
}
