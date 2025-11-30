import { HttpClient } from '@angular/common/http';
import { Component, ViewChildren, QueryList, ElementRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthStateService } from '../auth-sign-in/sign-in.component';

@Component({
  selector: 'app-verification',
  template: `
    <div
      class="verification-container  flex flex-col items-center justify-center min-h-screen px-4"
    >
      <p class=" mb-2 text-center">
        A verification code has been sent to your email. Please enter the 6-digit code below.
      </p>

      <form class="flex flex-col items-center gap-6 w-full max-w-sm" (submit)="onSubmit($event)">
        <div class="flex gap-2 justify-center">
          @for (item of inputs; track $index) {
          <input
            #otpInput
            type="text"
            maxlength="1"
            (input)="onInput($event, $index)"
            (keydown.backspace)="onBackspace($event, $index)"
            class="w-12 h-12 text-center border rounded-md text-focus:ring-2 focus:ring-blue-500 outline-none"
          />
          }
        </div>

        <button type="submit" class="mt-6 bg-blue-600 hover:bg-blue-700  px-6 py-2 rounded-lg">
          {{ loading() ? 'verifying' : 'verify' }}
        </button>
      </form>
    </div>
  `,
})
export class VerificationComponent {
  http = inject(HttpClient);
  private router = inject(Router);
  authState = inject(AuthStateService);
  loading = signal(false);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  inputs = Array(6).fill(0);
  otp = '';

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && index < this.otpInputs.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }

    this.combineOtp();
  }

  onBackspace(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (!input.value && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }

    this.combineOtp();
  }

  combineOtp() {
    // read all inputs and join them into a single string
    this.otp = this.otpInputs.map((el) => el.nativeElement.value).join('');
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.combineOtp();
    this.loading.set(true);

    if (this.otp.length === 6) {
      const res: any = await firstValueFrom(
        this.http.post(`${environment.apiBaseUrl}/auth/verify`, { otp: this.otp })
      );

      localStorage.setItem('access-token', res.accessToken);
      this.authState.setLoggedIn(true);
      this.authState.setAccessToken(res.accessToken);
      this.authState.setLoggedIn(true);

      this.router.navigateByUrl('/');
    } else {
      console.warn('Please enter valid 6-digit OTP code.');
    }
  }
}
