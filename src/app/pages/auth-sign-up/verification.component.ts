import { HttpClient } from '@angular/common/http';
import { Component, ViewChildren, QueryList, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthStateService } from '../../core/auth/auth-state.service';

@Component({
  selector: 'app-verification',
  template: `
    <div
      class="verification-container bg-black text-white flex flex-col items-center justify-center min-h-screen px-4"
    >
      <h2 class="text-2xl font-bold mb-4">Email Verification</h2>

      <p class="text-gray-300 mb-2 text-center">
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

        <button
          type="submit"
          class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Verify
        </button>
      </form>

      <button routerLink="/auth/sign-in" class="mt-6 text-blue-400 hover:underline">
        Back to Sign In
      </button>
    </div>
  `,
})
export class VerificationComponent {
  http = inject(HttpClient);
  private router = inject(Router);
  authState = inject(AuthStateService);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  inputs = Array(6).fill(0);
  otp = ''; // stores combined value

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

    console.log('OTP value:', this.otp);
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.combineOtp();

    if (this.otp.length === 6) {
      console.log('Submitting OTP:', this.otp);
      console.log('type of otp:', typeof this.otp);

      const res: any = await firstValueFrom(
        this.http.post(`http://localhost:4442/auth/verify`, { otp: this.otp })
      );

      console.log('Verification response:', res);

      localStorage.setItem('access-token', res.accessToken);
      this.authState.setLoggedIn(true);
      this.authState.setAccessToken(res.accessToken);
      this.authState.setLoggedIn(true);
      this.router.navigateByUrl('/houses');
    } else {
      console.warn('Please enter valid 6-digit OTP code.');
    }
  }
}
