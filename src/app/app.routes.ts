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
import { Bookmarks } from './pages/bookmarks/bookmarks.component';
import { Settings } from './settings/settings.component';
import { VerificationComponent } from './pages/auth-sign-up/verification.component';
import { LoginSuccessComponent } from './pages/log-in.component';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'OAuth-login', component: LoginSuccessComponent },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: Signin },
      { path: 'sign-up', component: Signup },
      {
        path: 'app-verification',
        component: VerificationComponent,
      },
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
      {
        path: 'houses',
        loadChildren: () => import('./houses/houses.route').then((m) => m.HOUSES_ROUTES),
        canActivate: [AuthGuard],
      },
      { path: 'admin', component: Admin },
      { path: 'bookmarks', component: Bookmarks },

      {
        path: 'app-notifications',
        loadComponent: () =>
          import('./notifications/notifications.component').then((m) => m.NotificationsComponent),
      },
      {
        path: 'settings',
        component: Settings,
        children: [{ path: 'update-password', component: UpdatePassword }],
      },
    ],
  },
];
