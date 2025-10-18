import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthFormService } from '../../core/auth/auth-form.service';
import { SignupDto, SignupSchema, zodFieldValidator } from '../../core/auth/auth-credentials.dto';
import { AuthStateService } from '../../core/auth/auth-state.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule, ],
  templateUrl: `./sign-up.component.html`,
})
export class SignupComponent {
  private auth = inject(AuthFormService);
  private fb = inject(FormBuilder);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/google.svg')
    );
  }

  apiUrl = 'sign-up';
  message = signal<string | null>(null);
  isSuccess = signal<boolean | null>(null);
  loading = signal(false);
  accessToken = signal<string>('');
  fieldErrors = signal<Partial<Record<keyof SignupDto, string>>>({});
  userEmail = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    email: ['', zodFieldValidator(SignupSchema, 'email')],
    password: ['', zodFieldValidator(SignupSchema, 'password')],
  });

  async onSubmit() {
    await this.auth.submit({
      form: this.form,
      apiUrl: this.apiUrl,
      message: this.message,
      isSuccess: this.isSuccess,
      fieldErrors: this.fieldErrors,
      userEmail: this.userEmail,
      loading: this.loading,
      accessToken: this.accessToken,
    });

    if (this.isSuccess()) {
      localStorage.setItem('access-token', this.accessToken());
      this.authState.setLoggedIn(true);
      this.router.navigateByUrl('/tasks');
    }
  }

  // --- Google Sign-In ---
  loginWithGoogle() {
    this.auth.loginWithGoogle(); // redirects to backend /auth/google
  }

  async handleGoogleCallback(code: string) {
    // use your AuthFormService to handle backend callback
    await this.auth.handleGoogleCallback(
      {
        message: this.message,
        isSuccess: this.isSuccess,
        userEmail: this.userEmail,
        accessToken: this.accessToken,
      } as any,
      code
    );

    if (this.isSuccess()) {
      localStorage.setItem('access-token', this.accessToken());
      this.authState.setLoggedIn(true);
      this.router.navigateByUrl('/tasks');
    }
  }
}
