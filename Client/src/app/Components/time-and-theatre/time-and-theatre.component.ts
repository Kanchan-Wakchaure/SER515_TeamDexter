import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-and-theatre',
  templateUrl: './time-and-theatre.component.html',
  styleUrls: ['./time-and-theatre.component.css']
})
export class TimeAndTheatreComponent implements OnInit {

  day1 = [
  	{ time: '11:00', theatre: 'inox 1' },
  	{ time: '13:30', theatre: 'pvr 1' },
  	{ time: '14:45', theatre: 'big 1' },
  	{ time: '17:00', theatre: 'net 1' },

  ];
  
  day2 = [
  	{ time: '11:20', theatre: 'inox 2' },
  	{ time: '13:50', theatre: 'pvr 2' },
  	{ time: '14:00', theatre: 'big 2' },
  	{ time: '17:05', theatre: 'net 2' },

  ];

  day3 = [
  	{ time: '11:10', theatre: 'inox 3' },
  	{ time: '13:40', theatre: 'pvr 3' },
  	{ time: '14:10', theatre: 'big 3' },
  	{ time: '17:10', theatre: 'net 3' },

  ];

  constructor() { }

  ngOnInit() {
  }
}
