import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Home } from './pages/home/home.component';
import { Signin } from './pages/auth-sign-in/sign-in.component';
import { AppLayout } from './lay-out/app-layout.component';
import { Admin } from './admin/admin.component';
import { Houses } from './houses/houses.component';
import { MyHouses } from './houses/my-houses.component';
import { Upload } from './houses/upload-house.component';
import { Bookmarks } from './pages/bookmarks/bookmarks.component';
import { House } from './houses/house.component';
import { Signup } from './pages/auth-sign-up/sign-up.component';
import { VerificationComponent } from './pages/auth-sign-up/verification.component';
import { Search } from './houses/search.component';
import { Notifications } from './notifications/notifications.component';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'search-house', component: Search, pathMatch: 'full' },
  // { path: 'oauth-login', component: LoginSuccessComponent },
  {
    path: 'auth',
    children: [
      { path: 'sign-up', component: Signup },
      { path: 'app-verification', component: VerificationComponent },
      { path: 'sign-in', component: Signin },
      { path: 'google', redirectTo: 'google/callback' },
      // { path: 'forgot-password', component: ForgotPassword },
      // { path: 'reset-password/:resetToken', component: ResetPassword },
    ],
  },
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'houses', component: Houses },
      { path: 'house', component: House },
      { path: 'upload-house', component: Upload },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayout,
    children: [
      { path: 'admin', component: Admin },
      { path: 'notifications', component: Notifications },
      { path: 'my-houses', component: MyHouses },
      { path: 'bookmarks', component: Bookmarks },
    ],
  },
];
