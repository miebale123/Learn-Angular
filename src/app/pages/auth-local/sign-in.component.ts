import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SigninSchema, SignupSchema } from '../../auth/auth-credentials.dto';
import { MatIconModule } from '@angular/material/icon';
import { SocialLogIn } from '../social.component';
import { BaseAuthForm } from './baseAuth';
import { zodFieldValidator } from '../../auth/auth.validation';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: `./sign-up.component.html`,
})
export class Signup extends BaseAuthForm {
  apiUrl = 'sign-up';

  fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', zodFieldValidator(SignupSchema, 'email')],
      password: ['', zodFieldValidator(SignupSchema, 'password')],
    });
  }

  async onSubmit() {
    await this?.submitBase(this.apiUrl);
  }

  protected override afterSuccess() {
    this.store.showAuthModal(false);
    this.router.navigateByUrl('/auth/app-verification');
  }
}

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule, SocialLogIn],
  templateUrl: `./sign-in.component.html`,
})
export class Signin extends BaseAuthForm {
  apiUrl = 'sign-in';
  fb = inject(FormBuilder);

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');

    if (token) {
      sessionStorage.setItem('access-token', token);
      this.authState.setAccessToken(token);
      this.authState.setLoggedIn(true);
    }

    if (email) {
      this.authState.setUserEmail(email);
    }

    this.form = this.fb.group({
      email: ['', zodFieldValidator(SigninSchema, 'email')],
      password: ['', zodFieldValidator(SigninSchema, 'password')],
    });
  }

  async onSubmit() {
    await this?.submitBase(this.apiUrl);
  }

  protected override afterSuccess() {
    console.log('hello world');
    sessionStorage.setItem('access-token', this.accessToken());
    this.authState.setLoggedIn(true);
    this.store.showAuthModal(false);

    if (this.authState.isAdmin()) {
      this.router.navigateByUrl('/admin-page');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password');
  }

  get emailError() {
    return this.fieldErrors()['email'];
  }

  get passwordError() {
    return this.fieldErrors()['password'];
  }
}
