import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styles: [``],
})
export class SkeletonComponent {
  constructor() {}

  isLoading = signal<boolean>(false); // false por defecto

  public hide(): void {
    this.isLoading.set(false);
  }
  public show(): void {
    this.isLoading.set(true);
  }
}
