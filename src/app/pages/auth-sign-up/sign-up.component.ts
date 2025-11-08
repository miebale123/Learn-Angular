import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthFormService } from '../../core/auth/auth-form.service';
import { AuthStateService } from '../../core/auth/auth-state.service';
import { SigninDto, SigninSchema, zodFieldValidator } from '../../core/auth/auth-credentials.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: `./sign-up.component.html`,
})
export class Signup {
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
    const token = this.route.snapshot.queryParamMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');

    if (token) {
      localStorage.setItem('access-token', token);
      this.authState.setAccessToken(token);
      this.authState.setLoggedIn(true);
    }

    if (email) {
      this.authState.setUserEmail(email);
    }
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
      this.router.navigateByUrl('/houses');
    }
  }

  // --- Google Sign-In ---
  loginWithGoogle() {
    console.log(environment.apiBaseUrl);
    this.auth.loginWithGoogle(); // redirects to backend /auth/google
  }
}
