import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {
  
  private readonly ACCESS_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';

  save(access: string, refresh: string): void {
    localStorage.setItem(this.ACCESS_KEY, access);
    localStorage.setItem(this.REFRESH_KEY, refresh);
  }
  
  getAccess(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }
  
  getRefresh(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  clear(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }
}
