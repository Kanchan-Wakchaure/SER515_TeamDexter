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
import { NgbPaginationModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './Components/MovieComponents/movie-card-component/movie-card.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { MovieSlideComponent } from './Components/MovieComponents/movie-slide/movie-slide.component';
import { LoginComponent } from './Components/login/login.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

import { MovieService } from './Services/movie.service';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { AuthenticationService } from './Services/authentication.service';
import { SignupComponent } from './Components/signup/signup.component';
import { PreferencesComponent } from './Components/preferences/preferences.component';
import { SimilarMoviesComponent } from './Components/similar-movies/similar-movies.component';
import { TimeAndTheatreComponent } from './Components/time-and-theatre/time-and-theatre.component';
import { PreferenceService } from './Services/preference.service';
import { ActivationComponent } from './Components/activation/activation.component';
import { CityService } from './Services/city.service';


const routes: Routes = [
    { path: 'coming_soon', component: HomeComponent },
    { path: 'wish_list/:id', component: HomeComponent },
    { path: 'latest', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'movie_details', component: MovieDetailsComponent },
    { path: 'search', component: HomeComponent },
    { path: 'preferences', component: PreferencesComponent },
    { path: 'activate', component: ActivationComponent },
    { path: 'user_profile', component: UserProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    entryComponents: [
        LoginComponent,
        SignupComponent,
        TimeAndTheatreComponent
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
        ActivationComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
        MatToolbarModule,
        HttpClientModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        MatTabsModule,
        MatAutocompleteModule,
        NgbPaginationModule
    ],
    providers: [
        MovieService,
        AuthenticationService,
        CityService,
        PreferenceService,
        NgbPaginationConfig
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
