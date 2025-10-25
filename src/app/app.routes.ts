import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { Home } from './pages/home/home.component';
import { Signin } from './pages/auth-sign-in/sign-in.component';
import { Signup } from './pages/auth-sign-up/sign-up.component';
import { ForgotPassword } from './pages/auth-password-forgot/forgot-password..component';
import { ResetPassword } from './pages/auth-password-reset/reset-password.component';
import { UpdatePassword } from './pages/auth-password-update/update-password.component';
import { AppLayout } from './lay-out/app-layout.component';
import { Admin } from './admin/admin.component';
import { Upload } from './pages/upload/upload.component';
// import { Bookmarks } from './pages/bookmarks/bookmarks.component';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: Signin },
      { path: 'sign-up', component: Signup },
      { path: 'google', redirectTo: 'google/callback' },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'reset-password/:resetToken', component: ResetPassword },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayout,
    children: [
      { path: 'admin', component: Admin },
      { path: 'upload', component: Upload },
      // { path: 'bookmarks', component: Bookmarks },
      { path: 'update-password', component: UpdatePassword },
    ],
  },
];
