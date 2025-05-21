import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  providers: [Title],
  templateUrl: './not-found.component.html',
})
export default class NotFoundComponent {
  constructor(
    private title: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title.setTitle('Página no encontrada');
  }

  Back(): void {
    this.router.navigate(['/']);
  }
}
