import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/book-list.component';

@Component({
  selector: 'app-lab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, BookListComponent],
  template: ` 
  <h1>Lab</h1>
  <br/>
  <app-book-list></app-book-list>
  <router-outlet />
  `,
  styles: ``,
})
export class LabComponent {}
