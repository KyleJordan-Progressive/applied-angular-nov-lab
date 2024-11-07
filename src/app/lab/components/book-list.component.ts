import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [JsonPipe],
  template: `

    <ul>
      @for(book of books(); track book.id) {
      <li>
        <pre>{{ book | json }}</pre>
      </li>
      }
    </ul>
  `,
  styles: ``,
})
export class BookListComponent {
  #client = inject(HttpClient);
  books = toSignal(
    this.#client
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>("/api/books")
      .pipe(map((res) => res.data)),
  );
}
