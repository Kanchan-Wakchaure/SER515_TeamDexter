import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MovieCardComponent } from './Components/MovieComponents/movie-card-component/movie-card.component';
import { MovieService } from './Services/movie.service';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
    { path: 'coming_soon', component: HomeComponent },
    { path: 'wish_list/:id', component: HomeComponent },
    { path: 'latest', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
]


@NgModule({
    declarations: [
        AppComponent,
        MovieCardComponent,
        NavbarComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        RouterModule.forRoot(routes),
        MatToolbarModule
    ],
    providers: [MovieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
