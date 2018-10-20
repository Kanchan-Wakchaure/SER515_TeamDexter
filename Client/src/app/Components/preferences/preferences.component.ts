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
  genreList = [];
  languageList = [];
  actorsList = [];

  dropdownSettings = {};

  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(public preferenceService: PreferenceService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.preference = new Preference();
    this.route.params.subscribe(params => { this.user_id = params['user_id'] });
    this.getPreference();

    this.genreList = [
      { id: 1, item_text: 'Action' },
      { id: 2, item_text: 'Drama' },
      { id: 3, item_text: 'Romance' },
      { id: 4, item_text: 'Thriller' },
      { id: 5, item_text: 'Comedy' }
    ];

    this.languageList = [
      { id: 1, item_text: 'English' },
      { id: 2, item_text: 'Spanish' },
      { id: 3, item_text: 'Hindi' }
    ];

    this.actorsList = [
      { id: 1, item_text: 'Will Smith' },
      { id: 2, item_text: 'Tom Hanks' },
      { id: 3, item_text: 'Angelina Jolie' },
      { id: 4, item_text: 'Tom Cruise' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect (item:any) {
    console.log(item);
  }

  onSelectAll (items: any) {
    console.log(items);
  }

  get diagnostic() { return JSON.stringify(this.preference); }


  submitPreference(){
    this.preferenceService.updatePreferences(this.user_id , this.preference);
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