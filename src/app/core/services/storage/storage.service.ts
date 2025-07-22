import { Injectable } from '@angular/core';
import { JwtPayload } from '@core/models/Token.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // ===== LOCAL STORAGE =====
  setLocal(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocal<T = any>(key: string): T | string | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data; // si no es JSON, lo devuelve como string plano
    }
  }

  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocal(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return this.getLocal('token');
  }

  getUser(): any | null {
    return this.getLocal('user');
  }

  getMenu(): string | null {
    return this.getLocal('menu');
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.getToken(); // o donde lo tengas guardado
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  getIdentification(): string {
    const payload = this.getDecodedToken();
    return payload?.Identification || '';
  }

  getRoleId(): string | null {
    const payload = this.getDecodedToken();
    return payload?.RoleId || null;
  }

  // ===== COOKIES =====
  setCookie(name: string, value: string, days = 7): void {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  clearCookies(): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
      this.deleteCookie(name);
    }
  }
}
