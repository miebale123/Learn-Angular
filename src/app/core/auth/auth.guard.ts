import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access-token');
    if (!token) {
      this.router.navigateByUrl('auth/sign-in');
      return false;
    }
    return true;
  }
}
