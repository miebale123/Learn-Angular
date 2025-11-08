import { Component, signal, OnInit, inject } from '@angular/core';
import { AuthStateService } from '../core/auth/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'oauth-login',
  template: ``,
})
export class LoginSuccessComponent implements OnInit {
  router = inject(Router);
  auth = inject(AuthStateService);

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (token && email) {
      localStorage.setItem('access-token', token);
      this.auth.setAccessToken(token);
      this.auth.setLoggedIn(true);
      this.router.navigateByUrl('/houses');
    }
  }
}
