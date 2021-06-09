import { Component, Injectable, OnInit } from '@angular/core';

import { BooksDataService } from '../books-data.service';

export class Book{
  _id!:number;
  title!:string;
  keyword!:string;
  isbn!:number;
  author!:string[];
  
}
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  book: Book = new Book();
books:Book[]=[];
  cconstructor(private booksDataService:BooksDataService){
   
  }

  ngOnInit(): void {
    this.getBooks();
  }

private getbooks():void {
    this.booksDataService.getBooks().then((response)=>{this.gotBooks(response)}).catch(this.handleError);
  }
  
  save(){
    console.log(this.book);
    this.booksDataService.saveBook(this.book).then((newBook) => {
      console.log("Successfully saved: "+newbook);
        this.book = new Book();
        
      }).catch(err => {
        console.log(err);
      })
  }
  private gotbooks(response:Book[]){
    this.books=response;

  }
  private handleError(error:any){
    console.log(error);

  }
}


