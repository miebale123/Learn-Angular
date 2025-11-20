import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { Home } from './pages/home/home.component';
import { Signin } from './pages/auth-sign-in/sign-in.component';
import { Signup } from './pages/auth-sign-up/sign-up.component';
import { ForgotPassword } from './pages/auth-password-forgot/forgot-password..component';
import { ResetPassword } from './pages/auth-password-reset/reset-password.component';
import { AppLayout } from './lay-out/app-layout.component';
import { Admin } from './admin/admin.component';
// import { Bookmarks } from './pages/bookmarks/bookmarks.component';
import { VerificationComponent } from './pages/auth-sign-up/verification.component';
import { LoginSuccessComponent } from './pages/oauth-log-in.component';
import { Houses } from './houses/houses.component';
import { PushComponent } from './push.component';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'oauth-login', component: LoginSuccessComponent },
  {
    path: 'auth',
    children: [
      { path: 'sign-up', component: Signup },
      { path: 'app-verification', component: VerificationComponent },
      { path: 'sign-in', component: Signin },
      { path: 'google', redirectTo: 'google/callback' },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'reset-password/:resetToken', component: ResetPassword },
    ],
  },
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'houses', component: Houses },
      // { path: 'upload-house', component: UploadHouse },
      // { path: 'my-uploads', component: MyUploads },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayout,
    children: [
      { path: 'admin', component: Admin },
      { path: 'app-notifications', component: Notification },
      { path: 'app-push', component: PushComponent },
      // { path: 'bookmarks', component: Bookmarks },
    ],
  },
];
