import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { MovieCardComponent } from './Components/MovieComponents/movie-card-component/movie-card.component';
import { MovieService } from './Services/movie.service';


@NgModule({
    declarations: [
        AppComponent,
        MovieCardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule
    ],
    providers: [MovieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
