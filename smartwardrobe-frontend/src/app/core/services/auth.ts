import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Token } from './token';
import { environment } from '../../../environments/environment';

interface AuthTokens {
  access: string;
  refresh: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API = `${environment.apiUrl}/api/auth`;

  constructor (
    private http: HttpClient,
    private tokenService: Token,
  ) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.API}/register/`, data)
  }

  login(data: LoginData): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.API}/token/`, data).pipe(
      tap(tokens => {
        this.tokenService.save(tokens.access, tokens.refresh);
      })
    )
  }

  refresh(): Observable<AuthTokens> {
    const refreshToken = this.tokenService.getRefresh();
    return this.http.post<AuthTokens>(`${this.API}/token/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap(tokens => {
        this.tokenService.save(tokens.access, tokens.refresh);
      })
    )
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.API}/me/`);
  }

  logout(): void {
    return this.tokenService.clear();
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getAccess;
  }
}
