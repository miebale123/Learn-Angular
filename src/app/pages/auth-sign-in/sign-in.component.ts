import { Component, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { SigninDto, SigninSchema, zodFieldValidator } from '../../core/auth/auth-credentials.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { AuthFormState } from '../../core/auth/auth-form.state';
import { mapAuthError } from '../../core/auth/auth-err.util';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStateService);
  const http = inject(HttpClient);

  const accessToken = localStorage.getItem('access-token');
  const cloned = accessToken
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
    : req.clone({ withCredentials: true });

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return http
          .post<{ accessToken: string }>(
            `${environment.apiBaseUrl}/auth/refresh`,
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap((res) => {
              localStorage.setItem('access-token', res.accessToken);
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.accessToken}` },
                withCredentials: true,
              });
              return next(retryReq);
            }),
            catchError(() => {
              auth.logout();
              return throwError(() => error);
            })
          );
      }

      return throwError(() => error);
    })
  );
};

@Injectable({ providedIn: 'root' })
export class AuthFormService {
  private readonly http = inject(HttpClient);
  private readonly authState = inject(AuthStateService);
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  async submit(component: AuthFormState) {
    const { form, apiUrl, message, isSuccess, fieldErrors, loading, userEmail, accessToken } =
      component;

    if (form.invalid) return;

    loading.set(true);
    fieldErrors.set({});
    message.set(null);
    isSuccess.set(null);
    userEmail.set(null);

    try {
      const dto = form.value;
      const res: any = await firstValueFrom(this.http.post(`${this.baseUrl}/${apiUrl}`, dto));
      console.log(res);

      message.set(res?.message);
      userEmail.set(res?.userEmail);
      isSuccess.set(true);
      form.reset();

      const token = res?.accessToken;
      if (token) {
        accessToken.set(token);
        localStorage.setItem('access-token', token);

        this.authState.setAccessToken(token);
        this.authState.setLoggedIn(true);
      }

      if (res?.userEmail) {
        this.authState.setUserEmail(res.userEmail);
      }
    } catch (err: any) {
      const mapped = mapAuthError(err?.error);
      if (mapped.fieldErrors) fieldErrors.set(mapped.fieldErrors);
      if (mapped.message) message.set(mapped.message);
      isSuccess.set(false);
    } finally {
      loading.set(false);
    }
  }

  loginWithGoogle() {
    window.location.href = `${this.baseUrl}/google`;
  }
}

export interface JwtPayload {
  sub: number;
  email: string;
  roles: UserRole[];
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Expert = 'expert',
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  isLoggedIn = signal(!!localStorage.getItem('access-token'));

  private _userEmail = signal<string | null>(null);
  private _accessToken = signal<string | null>(null);
  private _userRoles = signal<UserRole[]>([]);

  userEmail = this._userEmail.asReadonly();
  accessToken = this._accessToken.asReadonly();
  userRoles = this._userRoles.asReadonly();

  http = inject(HttpClient);

  constructor() {
    const token = localStorage.getItem('access-token');
    if (token) this.setAccessToken(token);
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn.set(value);
  }

  setUserEmail(email: string | null) {
    this._userEmail.set(email);
  }

  setAccessToken(token: string | null) {
    this._accessToken.set(token);

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      this._userRoles.set(decoded.roles ?? []);
      this._userEmail.set(decoded.email);
    } else {
      this._userRoles.set([]);
      this._userEmail.set(null);
    }
  }

  async refresh() {
    try {
      const res: any = await firstValueFrom(
        this.http.post(`${environment.apiBaseUrl}/auth/refresh`, {}, { withCredentials: true })
      );
      if (res?.accessToken) {
        localStorage.setItem('access-token', res.accessToken);
        this.setAccessToken(res.accessToken);
        this.setLoggedIn(true);
      }
    } catch (err) {
      console.error('Refresh failed', err);
      this.setAccessToken(null);
      this.setLoggedIn(false);
    }
  }

  router = inject(Router);

  async logout() {
    const res: any = await firstValueFrom(
      this.http.post(`${environment.apiBaseUrl}/auth/log-out`, {}, { withCredentials: true })
    );

    console.log(res);

    this.isLoggedIn.set(false);
    this._userEmail.set(null);
    this._accessToken.set(null);
    this._userRoles.set([]);
    localStorage.removeItem('access-token');
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return this._userRoles().includes(UserRole.Admin);
  }

  isExpert(): boolean {
    return this._userRoles().includes(UserRole.Expert);
  }

  hasRole(role: UserRole): boolean {
    return this._userRoles().includes(role);
  }
}

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
    this.auth.loginWithGoogle(); // redirects to backend /auth/google
  }
}
