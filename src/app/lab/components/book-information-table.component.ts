import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
  } from '@angular/core';
import { Book } from '../models/bookModels';
  
  @Component({
    selector: 'app-book-information-table',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [],
    template: `
      <div class="overflow-x-auto">
      <h2>Book Information</h2>
      <br/>
      <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" (input)="onSearch($event)">
      <br/><br/>
      <table class="table bg-base-200">
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of paginatedBooks(); track book.id) {
            <tr>
              <td>{{ book.id }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
      <br/>
      <div class="pagination join">
        <button class="join-item btn" (click)="previousPage()" [disabled]="currentPage === 1">«</button>
        <button class="join-item btn">{{ this.currentPage }}</button>
        <button class="join-item btn" (click)="nextPage()" [disabled]="currentPage === maxPage">»</button>
      </div>
    </div>
    `,
    styles: ``,
  })
  export class BookInformationTableComponent {
    @Input({ required: true }) books: Book[] = [];

    itemsPerPage = 10;
    currentPage = 1;
    maxPage = Math.ceil(this.books.length / this.itemsPerPage);
    currentSearchString = "";
    applicableBooks: Book[] = [];

    totalPages() {
        if (this.currentSearchString !== "") {
            this.maxPage = Math.ceil(this.books.length / this.itemsPerPage);
        }
        this.maxPage = Math.ceil(this.applicableBooks.length / this.itemsPerPage);
    }
    
    paginatedBooks() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;

        if (this.currentSearchString !== "") {
            return this.applicableBooks.slice(startIndex, startIndex + this.itemsPerPage);
        }
        return this.books.slice(startIndex, startIndex + this.itemsPerPage);
    }
    
    nextPage() {
        if (this.currentPage < this.maxPage) {
        this.currentPage++;
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
        this.currentPage--;
        }
    }

    onSearch(event: any) {
      this.applicableBooks = this.books;
      this.currentSearchString = event.target.value;

      const queries = this.currentSearchString.split(/[, ]+/).map((q: string) => q.trim().toLowerCase()).filter((q: string) => q.length > 0);

      this.applicableBooks = this.books.filter((book) => 
        queries.some(query => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query)
        )
      );

      this.totalPages();
    }
  }
  