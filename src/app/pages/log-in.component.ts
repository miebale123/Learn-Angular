import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService } from '../core/auth/auth-state.service';

@Component({
  selector: 'OAuth-login',
  template: `<p>Redirecting...</p>`,
})
export class LoginSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authState = inject(AuthStateService);

  ngOnInit() {
    this.route.queryParams.subscribe(({ token, email }) => {

      console.log('Login Success Component - token:', token, 'email:', email);
      if (token) {
        localStorage.setItem('access-token', token);
        this.authState.setAccessToken(token);
        this.authState.setLoggedIn(true);
        this.authState.setUserEmail(email);
        this.router.navigate(['/houses']); // redirect after storing
      }
    });
  }
}
