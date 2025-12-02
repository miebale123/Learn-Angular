import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { AuthStateService } from '../auth/auth-state.service';
import { environment } from '../../environments/environments';

@Component({
  selector: 'social-login',
  standalone: true,
  imports: [MatIconModule, MatIcon],
  template: `
    <div class="space-y-2">
      <p class="flex justify-center items-center">or</p>

      <button
        type="button"
        (click)="loginWithGoogle()"
        class="w-full flex gap-10 border border-gray-400 rounded-3xl p-2 items-center justify-center font-semibold hover:bg-gray-200"
      >
        <mat-icon svgIcon="google" class="w-5 h-5"></mat-icon>
        Continue with Google
      </button>

      <button
        type="button"
        class="w-full flex gap-12 border border-gray-400 rounded-3xl p-2 items-center justify-center font-semibold hover:bg-gray-200"
      >
        <mat-icon svgIcon="apple" class="w-5 h-5"></mat-icon>
        Continue with Apple
      </button>

      <button
        type="button"
        class="w-full flex  border border-gray-400 rounded-3xl p-2 items-center justify-around font-semibold hover:bg-gray-200"
      >
        <mat-icon svgIcon="facebook" class="w-5 h-5 ml-6"></mat-icon>
        <span >Continue with Facebook</span>
      </button>
    </div>
  `,
})
export class SocialLogIn {
  auth = inject(AuthStateService);

  loginWithGoogle() {
    window.location.href = `${environment.apiBaseUrl}/auth/google`;
  }
}
