import { firstValueFrom } from "rxjs";
import { AuthFormState } from "./auth-form.state";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthStateService } from "./auth-state.service";
import { environment } from "../../../environments/environments.prod";
import { mapAuthError } from "./auth-err.util";

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

      message.set(res?.message);
      userEmail.set(res?.userEmail);
      isSuccess.set(true);
      form.reset();

      if (accessToken && res?.accessToken) {
        accessToken.set(res.accessToken);
        localStorage.setItem('access-token', res.accessToken);
      }

      if (res?.userEmail) {
        this.authState.setUserEmail(res.userEmail);
        this.authState.setLoggedIn(true);
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

  /** --- Google OAuth --- */
  loginWithGoogle() {
    // Redirect user to backend Google OAuth endpoint
    window.location.href = `${this.baseUrl}/google`;
  }

  async handleGoogleCallback(component: AuthFormState, code: string) {
    const { message, userEmail, accessToken, isSuccess } = component;

    try {
      const res: any = await firstValueFrom(
        this.http.get(`${this.baseUrl}/google/callback?code=${code}`)
      );

      message.set(res?.message);
      userEmail.set(res?.userEmail);
      isSuccess.set(true);

      if (accessToken && res?.accessToken) {
        accessToken.set(res.accessToken);
        localStorage.setItem('access-token', res.accessToken);
      }

      if (res?.userEmail) {
        this.authState.setUserEmail(res.userEmail);
        this.authState.setLoggedIn(true);
      }
    } catch (err: any) {
      const mapped = mapAuthError(err?.error);
      if (mapped.message) message.set(mapped.message);
      isSuccess.set(false);
    }
  }
}
