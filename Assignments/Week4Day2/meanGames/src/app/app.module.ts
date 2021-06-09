//ng dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

//dependencies from your components

import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';

//Decorators
@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    HomePageComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomePageComponent
      },
      {
        path:"games",
        component:GamesListComponent
      },
      {
        path:"game/:gameId",
        component:GameDetailsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }                
