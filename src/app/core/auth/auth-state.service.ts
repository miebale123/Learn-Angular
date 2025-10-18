// core/auth/auth-state.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  isLoggedIn = signal(!!localStorage.getItem('access-token'));
  private _userEmail = signal<string | null>(null);
  private _accessToken = signal<string | null>(null);

  userEmail = this._userEmail.asReadonly();
  accessToken = this._accessToken.asReadonly();

  setLoggedIn(value: boolean) {
    this.isLoggedIn.set(value);
  }

  setUserEmail(email: string | null) {
    this._userEmail.set(email);
  }

  setAccessToken(token: string | null) {
    this._accessToken.set(token);
  }

  logout() {
    this.isLoggedIn.set(false);
    this._userEmail.set(null);
    this._accessToken.set(null);
    localStorage.removeItem('access-token');
  }
}
