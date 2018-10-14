import { Component, OnInit } from '@angular/core';
import { PreferenceService } from '../../Services/preference.service';
import { Preference } from '../../Components/preference.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})

export class PreferencesComponent implements OnInit {

  public preference: Preference;
  private user_id: number;
  genresList = [];
  languagesList = [];
  actorsList = [];

  dropdownSettings = {};

  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(public preferenceService: PreferenceService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.preference = new Preference();
    this.route.params.subscribe(params => { this.user_id = params['user_id'] });

    this.genresList = [
      { item_id: 1, item_text: 'Action' },
      { item_id: 2, item_text: 'Drama' },
      { item_id: 3, item_text: 'Romance' },
      { item_id: 4, item_text: 'Thriller' },
      { item_id: 5, item_text: 'Comedy' }
    ];

    this.languagesList = [
      { item_id: 1, item_text: 'English' },
      { item_id: 2, item_text: 'Spanish' },
      { item_id: 3, item_text: 'Hindi' }
    ];

    this.actorsList = [
      { item_id: 1, item_text: 'Will Smith' },
      { item_id: 2, item_text: 'Tom Hanks' },
      { item_id: 3, item_text: 'Angelina Jolie' },
      { item_id: 4, item_text: 'Tom Cruise' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  get diagnostic() { return JSON.stringify(this.preference); }


  submitPreference(){
    this.preferenceService.updatePreferences(this.user_id, this.preference);
  }

  submitNewPreference(){
    this.preferenceService.updateNewPreferences(this.preference);
  }

  getPreference(){
    this.preferenceService.getPreferencesById(this.user_id).subscribe((response: any) => {
      this.preference = response;
    });
  }
}