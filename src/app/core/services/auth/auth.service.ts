import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { map, Observable } from 'rxjs';
import { Token } from '@core/models/Token.model';
import { StorageService } from '../storage/storage.service';
import { AuthModels } from '@core/models/auth.models.ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = signal(false);

  private URL = environment.API_URL;
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);

  login(identification: number, password: string): Observable<AuthModels> {
    const cedula = identification.toString();
    return this.http.post<AuthModels>(`${this.URL}/Auth/Login`, { cedula, password }).pipe(
      map((response: AuthModels) => {
        this.saveTokens(response.data.token.accessToken, response.data.token.refreshToken);
        this.storage.setLocal('user', response.data.dataSap);
        this.router.navigate(['/dashboard']);
        this.isAuthenticated();
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.storage.getLocal('token');
    const isAuthenticated = !!token; // true si existe token, false si no
    this.isAuthenticated$.set(isAuthenticated);
    return isAuthenticated;
  }

  // Método para inicializar el estado de autenticación al cargar la aplicación
  initializeAuthState() {
    this.isAuthenticated();
  }

  logout() {
    this.storage.removeLocal('token');
    this.storage.removeLocal('user');
    this.storage.removeLocal('refreshToken');
    this.isAuthenticated$.set(false);
    this.router.navigate(['/auth/login']);
  }

  saveTokens(access: string, refresh: string) {
    this.storage.removeLocal('token');
    this.storage.removeLocal('refreshToken');
    this.storage.setLocal('token', access);
    this.storage.setLocal('refreshToken', refresh);
  }

  refreshToken(): Observable<Token> {
    const { accessToken, refreshToken } = this.getTokens();
    const body = {
      accessToken,
      refreshToken,
    };
    return this.http.post<Token>(`${this.URL}/Auth/refresh-token`, body);
  }

  getTokens() {
    const accessToken = this.storage.getLocal('token');
    const refreshToken = this.storage.getLocal('refreshToken');
    return { accessToken, refreshToken };
  }
}
