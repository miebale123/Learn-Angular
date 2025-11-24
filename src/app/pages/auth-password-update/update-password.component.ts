// import { Component, inject, signal } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { AuthFormService } from '../../core/auth/auth-form.service';
// import {
//   UpdatePasswordDto,
//   UpdatePasswordSchema,
//   zodFieldValidator,
// } from '../../core/auth/auth-credentials.dto';

// @Component({
//   selector: 'update-password',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterLink],
//   templateUrl: `./update-password.component.html`,
// })
// export class UpdatePassword {
//   private auth = inject(AuthFormService);
//   private fb = inject(FormBuilder);

//   apiUrl = 'sign-in';
//   message = signal<string | null>(null);
//   isSuccess = signal<boolean | null>(null);
//   loading = signal(false);
//   userEmail = signal<string | null>(null);

//   accessToken = signal<string>('');
//   fieldErrors = signal<Partial<Record<keyof UpdatePasswordDto, string>>>({});

//   form: FormGroup = this.fb.group({
//     currentPassword: ['', zodFieldValidator(UpdatePasswordSchema, 'currentPassword')],
//     newPassword: ['', zodFieldValidator(UpdatePasswordSchema, 'newPassword')],
//     confirmPassword: ['', zodFieldValidator(UpdatePasswordSchema, 'confirmPassword')],
//   });

//   async onSubmit() {
//     await this.auth.submit({
//       form: this.form,
//       apiUrl: this.apiUrl,
//       message: this.message,
//       isSuccess: this.isSuccess,
//       fieldErrors: this.fieldErrors,
//       userEmail: this.userEmail,
//       loading: this.loading,
//       accessToken: this.accessToken,
//     });
//   }
// }
