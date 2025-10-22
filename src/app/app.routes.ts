import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { Home } from './pages/home/home.component';
import { Signin } from './pages/sign-in/sign-in.component';
import { Signup } from './pages/sign-up/sign-up.component';
import { ForgotPassword } from './pages/forgot-password/forgot-password..component';
import { ResetPassword } from './pages/reset-password/reset-password.component';
import { Profile } from './pages/profile/profile.component';
import { UpdatePassword } from './pages/update-password/update-password.component';
import { Notes } from './notes/notes.component';
import { Note } from './notes/note.component';
import { AppLayout } from './app-layout.component';
import { Courses } from './courses.component';
import { DashBoard } from './pages/dashboard/dashboard.component';
import { Article } from './articles/article.component';
import { Created } from './pages/dashboard/created.component';
import { Saved } from './pages/dashboard/saved.component';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'app-courses', component: Courses },
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
    canActivate: [AuthGuard], // protect routes after login
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        component: DashBoard,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'created', // <-- default route
          },
          { path: 'created', component: Created },
          { path: 'saved', component: Saved },
        ],
      },
      { path: 'article', component: Article },
      { path: 'profile', component: Profile },
      { path: 'update-password', component: UpdatePassword },
      { path: 'notes', component: Notes },
      { path: 'notes/:id', component: Note },
    ],
  },
];
