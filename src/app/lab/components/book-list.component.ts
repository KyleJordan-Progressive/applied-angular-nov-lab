import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { BookService } from '../services/book.service';
import { BookInformationTableComponent } from './book-information-table.component';
import { CenturyTimelineComponent } from './century-timeline.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CenturyTimelineComponent, BookInformationTableComponent],
  template: `
    <div class="overflow-x-auto">
      <app-century-timeline [bookCounts]="bookCounts()"></app-century-timeline>
      <br />
      <app-book-information-table [books]="books()"></app-book-information-table>
    </div>
  `,
  styles: ``,
})
export class BookListComponent implements OnInit {
  bookService = inject(BookService);
  books = this.bookService.getBooks();

  ngOnInit(): void {
    this.bookService.fetchBooks();
  }

  bookCounts = computed(() => {
    const bookList = this.books();

    const centuryMap = bookList.reduce((acc, book) => {
      const century = this.getCentury(book.year);
      if (!acc[century]) {
        acc[century] = { century, count: 0 };
      }
      acc[century].count++;
      return acc;
    }, {} as { [key: number]: { century: number; count: number } });

    return Object.values(centuryMap).sort((a, b) => a.century - b.century);
  });

  getCentury(year: number): number {
    if (year % 100 === 0) {
      return year / 100;
    } else {
      return Math.floor(year / 100) + 1;
    }
  }
}
