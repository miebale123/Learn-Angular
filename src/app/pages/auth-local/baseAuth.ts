import { Directive, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthFormService } from '../../auth/auth-form.service';
import { AuthStateService } from '../../auth/auth-state.service';
import { HousesStore } from '../../houses/houses.store';
import { FormBuilder, FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseAuthForm {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/google.svg')
    );

    iconRegistry.addSvgIcon(
      'apple',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/apple.svg')
    );

    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/facebook.svg')
    );
  }

  store = inject(HousesStore);
  auth = inject(AuthFormService);
  authState = inject(AuthStateService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  message = signal<string | null>(null);
  isSuccess = signal<boolean | null>(null);
  loading = signal(false);
  accessToken = signal<string>('');
  fieldErrors = signal<Partial<Record<'email' | 'password', string>>>({});

  userEmail = signal<string | null>(null);

  async submitBase(apiUrl: string) {
    await this.auth.submit({
      form: this.form,
      apiUrl, // <-- use the argument, not this.apiUrl
      message: this.message,
      isSuccess: this.isSuccess,
      fieldErrors: this.fieldErrors,
      loading: this.loading,
      userEmail: this.userEmail,
      accessToken: this.accessToken,
    });

    if (this.isSuccess()) {
      this.afterSuccess();
    }
  }

  form!: FormGroup; // children will provide this

  protected abstract afterSuccess(): void;
}
