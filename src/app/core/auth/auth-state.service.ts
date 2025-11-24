// import { inject, Injectable, signal } from '@angular/core';
// import { firstValueFrom } from 'rxjs';
// import { environment } from '../../../environments/environments';
// import { HttpClient } from '@angular/common/http';
// import { jwtDecode } from 'jwt-decode';

// export interface JwtPayload {
//   sub: number;
//   email: string;
//   roles: UserRole[];
// }

// export enum UserRole {
//   User = 'user',
//   Admin = 'admin',
//   Expert = 'expert',
// }

// @Injectable({ providedIn: 'root' })
// export class AuthStateService {
//   isLoggedIn = signal(!!localStorage.getItem('access-token'));

//   private _userEmail = signal<string | null>(null);
//   private _accessToken = signal<string | null>(null);
//   private _userRoles = signal<UserRole[]>([]);

//   userEmail = this._userEmail.asReadonly();
//   accessToken = this._accessToken.asReadonly();
//   userRoles = this._userRoles.asReadonly();

//   http = inject(HttpClient);

//   constructor() {
//     const token = localStorage.getItem('access-token');
//     if (token) this.setAccessToken(token);
//   }

//   setLoggedIn(value: boolean) {
//     this.isLoggedIn.set(value);
//   }

//   setUserEmail(email: string | null) {
//     this._userEmail.set(email);
//   }

//   setAccessToken(token: string | null) {
//     this._accessToken.set(token);

//     if (token) {
//       const decoded = jwtDecode<JwtPayload>(token);
//       this._userRoles.set(decoded.roles ?? []);
//       this._userEmail.set(decoded.email);
//     } else {
//       this._userRoles.set([]);
//       this._userEmail.set(null);
//     }
//   }

//   async refresh() {
//     try {
//       const res: any = await firstValueFrom(
//         this.http.post(`${environment.apiBaseUrl}/auth/refresh`, {}, { withCredentials: true })
//       );
//       if (res?.accessToken) {
//         localStorage.setItem('access-token', res.accessToken);
//         this.setAccessToken(res.accessToken);
//         this.setLoggedIn(true);
//       }
//     } catch (err) {
//       console.error('Refresh failed', err);
//       this.setAccessToken(null);
//       this.setLoggedIn(false);
//     }
//   }

//   async logout() {
//     const res: any = await firstValueFrom(
//       this.http.post(`${environment.apiBaseUrl}/auth/log-out`, {}, { withCredentials: true })
//     );

//     console.log(res);

//     this.isLoggedIn.set(false);
//     this._userEmail.set(null);
//     this._accessToken.set(null);
//     this._userRoles.set([]);
//     localStorage.removeItem('access-token');
//   }

//   isAdmin(): boolean {
//     return this._userRoles().includes(UserRole.Admin);
//   }

//   isExpert(): boolean {
//     return this._userRoles().includes(UserRole.Expert);
//   }

//   hasRole(role: UserRole): boolean {
//     return this._userRoles().includes(role);
//   }
// }
