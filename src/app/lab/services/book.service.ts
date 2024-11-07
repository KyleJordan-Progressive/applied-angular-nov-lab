import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Book } from '../models/bookModels';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books = signal<Book[]>([]);

  constructor(private httpClient: HttpClient) {}

  fetchBooks() {
    this.httpClient
      .get<{ data: Book[] }>('/api/books')
      .pipe(
        tap((res) => {
          this.books.set(res.data);
        })
      )
      .subscribe();
  }

  getBooks() {
    return this.books;
  }
}