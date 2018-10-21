import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAndTheatreComponent } from './time-and-theatre.component';

describe('TimeAndTheatreComponent', () => {
  let component: TimeAndTheatreComponent;
  let fixture: ComponentFixture<TimeAndTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAndTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAndTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
