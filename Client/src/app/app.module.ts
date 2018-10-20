import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { MovieCardComponent } from './Components/MovieComponents/movie-card-component/movie-card.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { MovieSlideComponent } from './Components/MovieComponents/movie-slide/movie-slide.component';
import { LoginComponent } from './Components/login/login.component';

import { MovieService } from './Services/movie.service';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { AuthenticationService } from './Services/authentication.service';
import { SignupComponent } from './Components/signup/signup.component';
import { PreferencesComponent } from './Components/preferences/preferences.component';
import { SimilarMoviesComponent } from './Components/similar-movies/similar-movies.component';
import { TimeAndTheatreComponent } from './Components/time-and-theatre/time-and-theatre.component';
import { PreferenceService } from './Services/preference.service';


const routes: Routes = [
    { path: 'coming_soon', component: HomeComponent },
    { path: 'wish_list/:id', component: HomeComponent },
    { path: 'latest', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'movie_details', component: MovieDetailsComponent },
    { path: 'search', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
    entryComponents: [
        LoginComponent,
        SignupComponent
    ],
    declarations: [
        AppComponent,
        MovieCardComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        MovieDetailsComponent,
        MovieSlideComponent,
        LoginComponent,
        SignupComponent,
        PreferencesComponent,
        SimilarMoviesComponent,
        TimeAndTheatreComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        MatToolbarModule,
        HttpClientModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        MatTabsModule
    ],
    providers: [MovieService, AuthenticationService, PreferenceService],
    bootstrap: [AppComponent]
})
export class AppModule { }
