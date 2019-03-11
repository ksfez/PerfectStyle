import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import Book from '../../../../../../../model/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  
  constructor(private bookService: BookService) { }
  
  
  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(res => {
        this.books = res;
        console.log(res);
      });
  }

  createBook(book: Book) {
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id)
      .subscribe(res => {
        console.log(res);
      });
  }

  editBook(book: Book) {
  }
}
