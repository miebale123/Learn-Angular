// import { Component, inject, signal } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { AuthFormService } from '../../core/auth/auth-form.service';
// import {
//   ResetPasswordDto,
//   ResetPasswordSchema,
//   zodFieldValidator,
// } from '../../core/auth/auth-credentials.dto';

// @Component({
//   selector: 'reset-password',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterLink],
//   templateUrl: `reset-password.component.html`,
// })
// export class ResetPassword {
//   private auth = inject(AuthFormService);
//   private fb = inject(FormBuilder);
//   private route = inject(ActivatedRoute);

//   apiUrl = 'sign-up';
//   message = signal<string | null>(null);
//   isSuccess = signal<boolean | null>(null);
//   loading = signal(false);
//   userEmail = signal<string | null>(null);
//   accessToken = signal<string>('');
//   resetToken = this.route.snapshot.paramMap.get('resetToken');

//   fieldErrors = signal<Partial<Record<keyof ResetPasswordDto, string>>>({});

//   form = this.fb.group({
//     newPassword: ['', zodFieldValidator(ResetPasswordSchema, 'newPassword')],
//     confirmPassword: ['', zodFieldValidator(ResetPasswordSchema, 'confirmPassword')],
//   });

//   ngOnInit() {
//     if (!this.resetToken) {
//       this.message.set('Invalid or missing reset token. Please request a new password reset.');
//     }
//   }

//   async onSubmit() {
//     if (!this.resetToken || this.form.invalid) return;

//     await this.auth.submit({
//       form: this.form,
//       apiUrl: `reset-password/${this.resetToken}`,
//       message: this.message,
//       isSuccess: this.isSuccess,
//       fieldErrors: this.fieldErrors,

//       loading: this.loading,
//       userEmail: this.userEmail,
//       accessToken: '',
//     });
//   }
// }
