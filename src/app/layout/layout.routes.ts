import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'employees',
      //   loadChildren: () =>
      //     import('../features/employees/employees.routes').then(
      //       (m) => m.EMPLOYEES_ROUTES
      //     ),
      // },
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('../features/reports/reports.routes').then(
      //       (m) => m.REPORTS_ROUTES
      //     ),
      // },
    ],
  },
];
