import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BooksDataService } from '../books-data.service';
import { Book } from '../books-list/books-list.component';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book = {} as Book;
  deleteSuccess!:boolean;
  deleteFailure!:boolean;
  constructor(private booksDataService: BooksDataService, private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {

    const bookId: string = this.route.snapshot.params.bookId;
    console.log("Book Id is :" + bookId);
    this.getBook(bookId);
  }
  private getBook(bookId: string): void {

    this.booksDataService.getBook(bookId).then((response) => this.gotBook(response)).catch(this.handleError);

  }

  deleteBook(): void {
    this.booksDataService.deleteBook(this.book._id).then((response) => {this.deleteSuccess=true})
    .catch((error)=>{this.deleteFailure=true});

  }
  goBack():void {
    this.location.back();
  }


  private gotBook(response: Book) {
    console.log(response);
    this.book = response;
  }
  private handleError(error: any) {
    console.log(error);

  }

}
