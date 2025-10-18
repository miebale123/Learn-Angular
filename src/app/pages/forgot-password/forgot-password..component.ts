import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFormService } from '../../core/auth/auth-form.service';
import { SignupDto, SignupSchema, zodFieldValidator } from '../../core/auth/auth-credentials.dto';

@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: `./forgot-password.component.html`,
})
export class ForgotPasswordComponent {
  apiUrl = 'forgot-password';
  message = signal<string | null>(null);
  isSuccess = signal<boolean | null>(null);
  loading = signal(false);
  accessToken = signal<string>('');
  fieldErrors = signal<Partial<Record<keyof SignupDto, string>>>({});
  userEmail = signal<string | null>(null);

  form: FormGroup;
  private router = inject(Router);

  constructor(private auth: AuthFormService, private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', zodFieldValidator(SignupSchema, 'email')],
    });
  }

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
  }
}
