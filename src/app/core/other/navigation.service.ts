import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
