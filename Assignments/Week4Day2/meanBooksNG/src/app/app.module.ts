//ng dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

//dependencies from your components
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    HomePageComponent
    
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
      path:"books",
      component:BooksListComponent
    },
    {
      path:"book/:bookId",
      component:BookDetailComponent
    }
  ])
],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
