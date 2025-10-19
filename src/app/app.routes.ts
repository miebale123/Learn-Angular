import { Routes } from '@angular/router';
import { SigninComponent } from './pages/sign-in/sign-in.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password..component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { AuthGuard } from './core/auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AppLayoutComponent } from './app-layout.component';
import { NotesComponent } from './tasks/notes.component';
import { NoteComponent } from './tasks/note.component';
import { CoursesComponent } from './courses.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SigninComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'google', redirectTo: 'google/callback' },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:resetToken', component: ResetPasswordComponent },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard], // protect routes after login
    component: AppLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      // { path: 'dashboard', component: DashboardComponent},
      { path: 'app-notes', component: NotesComponent },
      { path: 'app-notes/:id', component: NoteComponent },
    ],
  },
];
