import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '@core/common/services/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading = false;
  private loadingSubscription: Subscription = new Subscription();
  private loadingService = inject(LoadingService);

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
