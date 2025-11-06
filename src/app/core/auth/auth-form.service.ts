import { firstValueFrom } from 'rxjs';
import { AuthFormState } from './auth-form.state';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { mapAuthError } from './auth-err.util';
import { AuthStateService } from './auth-state.service';

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

      const token = res?.access_token || res?.accessToken;
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

  async handleGoogleCallback(component: AuthFormState, code: string) {
    const { message, userEmail, accessToken, isSuccess } = component;

    try {
      const res: any = await firstValueFrom(
        this.http.get(`${this.baseUrl}/google/callback?code=${code}`)
      );


      console.log('Google callback response:', res);
      message.set(res?.message);
      userEmail.set(res?.userEmail);
      isSuccess.set(true);

      const token = res?.access_token || res?.accessToken;
      console.log('Google callback token:', token);
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
      if (mapped.message) message.set(mapped.message);
      isSuccess.set(false);
    }
  }
}
