import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  email = "adfsdv";
  genresList = [];
  languagesList = [];
  actorsList = [];
  selectedGenres = [];
  selectedLanguages = [];
  selectedActors = [];

  dropdownSettings = {};

  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor() { }

  ngOnInit() {

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
      { item_id: 4, item_text: 'Tom Cruise' },
    ];

    this.selectedGenres = [];
    this.selectedLanguages = [];
    this.selectedActors = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect (item:any) {
    console.log(item);
  }

  onSelectAll (items: any) {
    console.log(items);
  }

  get diagnostic() { return JSON.stringify(this.selectedGenres); }

  submitData(){
    
  }

}