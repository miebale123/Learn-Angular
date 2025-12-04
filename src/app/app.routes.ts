import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Home } from './pages/home/home.component';
import { Signin, Signup } from './pages/auth-local/sign-in.component';
import { AppLayout } from './lay-out/app-layout.component';
import { Houses } from './houses/houses.component';
import { Upload } from './houses/upload-house.component';
import { Bookmarks } from './pages/bookmarks/bookmarks.component';
import { Notifications } from './notifications/notifications.component';
import { Settings } from './pages/settings.component';
import { UploadBrokerInfo } from './upload_broker-info.component';
import { Broker } from './houses/broker.component';
import { HousesSearchResults } from './houses/houses-search-results.component';
import { VerificationComponent } from './pages/auth-local/verification.component';
import { MyHouses } from './houses/my-houses.component';

export const routes: Routes = [
  // { path: 'oauth-login', component: LoginSuccessComponent },
  {
    path: 'auth',
    children: [
      { path: 'sign-up', component: Signup },
      // app-verification
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
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'houses', component: Houses },
      { path: 'houses-search-results', component: HousesSearchResults },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayout,
    children: [
      { path: 'notifications', component: Notifications },
      { path: 'my-houses', component: MyHouses },
      { path: 'bookmarks', component: Bookmarks },
      { path: 'upload-house', component: Upload },
      { path: 'upload-broker-info', component: UploadBrokerInfo },
      { path: 'settings', component: Settings },
    ],
  },
];
