// import { Component, inject, Injectable, signal } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { RouterLink, Router, ActivatedRoute } from '@angular/router';
// import { SigninDto, SigninSchema, SignupSchema, zodFieldValidator } from '../../auth/auth-credentials.dto';
// import { DomSanitizer } from '@angular/platform-browser';
// import { MatIconRegistry } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { SocialLogIn } from '../social.component';
// import { AuthFormService } from '../../auth/auth-form.service';
// import { AuthStateService } from '../../auth/auth-state.service';

// @Component({
//   selector: 'sign-up',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: `./sign-up.component.html`,
// })
// export class Signup {
//   auth = inject(AuthFormService);
//   private fb = inject(FormBuilder);
//   private authState = inject(AuthStateService);
//   private router = inject(Router);
//   private route = inject(ActivatedRoute);

//   apiUrl = 'sign-up';
//   message = signal<string | null>(null);
//   isSuccess = signal<boolean | null>(null);
//   loading = signal(false);
//   accessToken = signal<string>('');
//   fieldErrors = signal<Partial<Record<keyof SigninDto, string>>>({});
//   userEmail = signal<string | null>(null);

//   form: FormGroup = this.fb.group({
//     email: ['', zodFieldValidator(SignupSchema, 'email')],
//     password: ['', zodFieldValidator(SignupSchema, 'password')],
//   });

//   ngOnInit() {
//     const token = this.route.snapshot.queryParamMap.get('token');
//     const email = this.route.snapshot.queryParamMap.get('email');

//     if (token) {
//       sessionStorage.setItem('access-token', token);
//       this.authState.setAccessToken(token);
//       this.authState.setLoggedIn(true);
//     }

//     if (email) {
//       this.authState.setUserEmail(email);
//     }
//   }

//   // --- Local Sign-In ---
//   async onSubmit() {
//     await this.auth.submit({
//       form: this.form,
//       apiUrl: this.apiUrl,
//       message: this.message,
//       isSuccess: this.isSuccess,
//       fieldErrors: this.fieldErrors,
//       loading: this.loading,
//       userEmail: this.userEmail,
//       accessToken: this.accessToken,
//     });

//     if (this.isSuccess()) {
//       sessionStorage.setItem('access-token', this.accessToken());
//       this.authState.setLoggedIn(true);
//       this.router.navigateByUrl('/auth/app-verification');
//     }
//   }
// }

// @Component({
//   selector: 'sign-in',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterLink, MatIconModule, SocialLogIn],
//   templateUrl: `./sign-in.component.html`,
// })
// export class Signin {
//   auth = inject(AuthFormService);
//   private fb = inject(FormBuilder);
//   private authState = inject(AuthStateService);
//   private router = inject(Router);
//   private route = inject(ActivatedRoute);

//   constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
//     iconRegistry.addSvgIcon(
//       'google',
//       sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/google.svg')
//     );

//     iconRegistry.addSvgIcon(
//       'apple',
//       sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/apple.svg')
//     );

//     iconRegistry.addSvgIcon(
//       'facebook',
//       sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/facebook.svg')
//     );
//   }

//   // Local Sign-In Signals
//   apiUrl = 'sign-in';
//   message = signal<string | null>(null);
//   isSuccess = signal<boolean | null>(null);
//   loading = signal(false);
//   accessToken = signal<string>('');
//   fieldErrors = signal<Partial<Record<keyof SigninDto, string>>>({});
//   userEmail = signal<string | null>(null);

//   form: FormGroup = this.fb.group({
//     email: ['', zodFieldValidator(SigninSchema, 'email')],
//     password: ['', zodFieldValidator(SigninSchema, 'password')],
//   });

//   ngOnInit() {
//     const token = this.route.snapshot.queryParamMap.get('token');
//     const email = this.route.snapshot.queryParamMap.get('email');

//     if (token) {
//       sessionStorage.setItem('access-token', token);
//       this.authState.setAccessToken(token);
//       this.authState.setLoggedIn(true);
//     }

//     if (email) {
//       this.authState.setUserEmail(email);
//     }
//   }

//   // --- Local Sign-In ---
//   async onSubmit() {
//     await this.auth.submit({
//       form: this.form,
//       apiUrl: this.apiUrl,
//       message: this.message,
//       isSuccess: this.isSuccess,
//       fieldErrors: this.fieldErrors,
//       loading: this.loading,
//       userEmail: this.userEmail,
//       accessToken: this.accessToken,
//     });

//     if (this.isSuccess()) {
//       sessionStorage.setItem('access-token', this.accessToken());
//       this.authState.setLoggedIn(true);

//       this.router.navigateByUrl('/');
//     }
//   }
// }
