import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: number; // user ID
  email: string;
  role: UserRole; // 👈 custom field
}
export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Expert = 'expert',
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  isLoggedIn = signal(!!localStorage.getItem('access-token'));

  private _userEmail = signal<string | null>(null);
  private _accessToken = signal<string | null>(null);
  private _userRole = signal<UserRole | null>(null);

  userEmail = this._userEmail.asReadonly();
  accessToken = this._accessToken.asReadonly();
  userRole = this._userRole.asReadonly();

  constructor() {
    const token = localStorage.getItem('access-token');
    if (token) this.setAccessToken(token);
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn.set(value);
  }

  setUserEmail(email: string | null) {
    this._userEmail.set(email);
  }

  setAccessToken(token: string | null) {
    this._accessToken.set(token);
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      this._userRole.set(decoded.role);
      this._userEmail.set(decoded.email);
    } else {
      this._userRole.set(null);
      this._userEmail.set(null);
    }
  }

  logout() {
    this.isLoggedIn.set(false);
    this._userEmail.set(null);
    this._accessToken.set(null);
    this._userRole.set(null);
    localStorage.removeItem('access-token');
  }

  isAdmin(): boolean {
    return this._userRole() === UserRole.Admin;
  }

  isExpert(): boolean {
    return this._userRole() === UserRole.Expert;
  }
}
