import Book from '../models/book';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  bookUrl = `/api`;

  constructor(
    private http: HttpClient
  ) { }

  //Create book, takes a Book Object
  createBook(book: Book): Observable<Book> {
    return this.http.post(`${this.bookUrl}`, book)
      .map(res  => {
        return res as Book;
      })
  }

  //Read list of books, takes no arguments
  getBooks(): Observable<Book[]> {
    return this.http.get(`${this.bookUrl}`)
      .map(res  => {
        return res as Book[];
      })
  }

  //Get book, takes a String
  getBook(id: String): Observable<Book> {
    return this.http.get(`${this.bookUrl}/${id}`)
      .map(res => {
        return res as Book;
      })
  }


  //Delete book, takes a String
  deleteBook(id: String): Observable<Book> {
    //Delete the object by the id
    let deleteUrl = `${this.bookUrl}/${id}`;
    return this.http.delete(deleteUrl)
      .map(res => {
        return res as Book;
      })
  }

  //Update book, takes a Book Object
  updateBook(book: Book): Observable<Book> {
    //Delete the object by the id
    let deleteUrl = `${this.bookUrl}/${book._id}`;
    return this.http.put(deleteUrl, book)
      .map(res => {
        return res as Book;
      })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo
    return Promise.reject(error.message || error);
  }

}
