import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  providers: [Title],
  templateUrl: './not-found.component.html',
})
export default class NotFoundComponent implements OnInit {
  private title = inject(Title);
  private router = inject(Router);

  ngOnInit(): void {
    this.title.setTitle('Página no encontrada');
  }

  Back(): void {
    this.router.navigate(['/']);
  }
}
