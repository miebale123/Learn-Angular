import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: number; // user ID
  email: string;
  roles: UserRole[]; // now an array
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
  private _userRoles = signal<UserRole[]>([]); // multiple roles

  userEmail = this._userEmail.asReadonly();
  accessToken = this._accessToken.asReadonly();
  userRoles = this._userRoles.asReadonly();

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
    console.log('Setting access token:', token);

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('Decoded JWT:', decoded);
      this._userRoles.set(decoded.roles ?? []);
      this._userEmail.set(decoded.email);
      console.log('User roles set to:', decoded.roles);
      console.log('User email set to:', decoded.email);
    } else {
      this._userRoles.set([]);
      this._userEmail.set(null);
    }
  }
  logout() {
    this.isLoggedIn.set(false);
    this._userEmail.set(null);
    this._accessToken.set(null);
    this._userRoles.set([]);
    localStorage.removeItem('access-token');
  }

  isAdmin(): boolean {
    return this._userRoles().includes(UserRole.Admin);
  }

  isExpert(): boolean {
    return this._userRoles().includes(UserRole.Expert);
  }

  hasRole(role: UserRole): boolean {
    return this._userRoles().includes(role);
  }
}
