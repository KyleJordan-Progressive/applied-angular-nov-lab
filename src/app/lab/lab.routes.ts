import { Routes } from '@angular/router';
import { LabComponent } from './lab.component';
import { BookListComponent } from './components/book-list.component';

export const LAB_ROUTES: Routes = [
  {
    path: '',
    component: LabComponent,
    children: [
      {
        path: 'booklist',
        component: BookListComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
