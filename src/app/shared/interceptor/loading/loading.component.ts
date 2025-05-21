import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../core/services/LoadingForInterceptor/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading = false;
  private loadingSubscription: Subscription = new Subscription();

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
