import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from "./books-list/books-list.component";

@Injectable({
  providedIn: 'root'
})
export class BooksDataService {
  private baseURL = "http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  public getBooks(): Promise<Book[]> {
    const url: string = this.baseURL + "/books";
    return this.http.get(url).toPromise().then(this.gotBooks).catch(this.handleError);
  }

  private gotBooks(response: any) {
    console.log(response);
    return response as Book[];
  }
  private handleError(error: any): Book[] {
    console.log(error);
    return [];
  }

  public getBook(bookId: string): Promise<Book> {
    const url: string = this.baseURL + "/books/" + bookId;
    return this.http.get(url).toPromise().then(this.gotBook).catch(this.handleErr);
  }

  public deleteBook(id: number): Promise<any> {
    const url: string = this.baseURL + "/books/" + id;

    return this.http.delete(url).toPromise().then((response) => response).catch(this.handleErr);
  }

  public saveBook(book: Book): Promise<Book> {
    const url: string = this.baseURL + "/books/";
    return this.http.post(url, book).toPromise().then(response => response as Book).catch(this.handleErr);
  }

  private gotBook(response: any): Book {
    console.log(response);
    return response as Book;
  }
  private handleErr(error: any): Book {
    console.log(error);
    return new Book;
  }
}
  

