import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor.component';
import { ChildComponent } from './child.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
