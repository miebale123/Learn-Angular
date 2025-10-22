import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthFormService } from '../../core/auth/auth-form.service';
import { SigninDto, SigninSchema, zodFieldValidator } from '../../core/auth/auth-credentials.dto';
import { AuthStateService } from '../../core/auth/auth-state.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: `./sign-in.component.html`,
})
export class Signin {
  auth = inject(AuthFormService);
  private fb = inject(FormBuilder);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/google.svg')
    );
  }

  // Local Sign-In Signals
  apiUrl = 'sign-in';
  message = signal<string | null>(null);
  isSuccess = signal<boolean | null>(null);
  loading = signal(false);
  accessToken = signal<string>('');
  fieldErrors = signal<Partial<Record<keyof SigninDto, string>>>({});
  userEmail = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    email: ['', zodFieldValidator(SigninSchema, 'email')],
    password: ['', zodFieldValidator(SigninSchema, 'password')],
  });

  ngOnInit() {
    // handle Google callback if URL has code
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) this.handleGoogleCallback(code);
  }

  // --- Local Sign-In ---
  async onSubmit() {
    await this.auth.submit({
      form: this.form,
      apiUrl: this.apiUrl,
      message: this.message,
      isSuccess: this.isSuccess,
      fieldErrors: this.fieldErrors,
      loading: this.loading,
      userEmail: this.userEmail,
      accessToken: this.accessToken,
    });

    if (this.isSuccess()) {
      localStorage.setItem('access-token', this.accessToken());
      this.authState.setLoggedIn(true);
      this.router.navigateByUrl('/notes');
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
      this.router.navigateByUrl('/notes');
    }
  }
}
