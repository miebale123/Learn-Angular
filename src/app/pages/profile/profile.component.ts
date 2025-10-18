import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { User as UserIcon, Mail, Lock, LogOut } from 'lucide-angular';
import { AuthStateService } from '../../core/auth/auth-state.service';

export interface User {
  email: string | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private auth = inject(AuthStateService);

  user = signal<User>({
    email: this.auth.userEmail(),
  });

  UserIcon = UserIcon;
  MailIcon = Mail;
  LockIcon = Lock;
  LogOutIcon = LogOut;

  async onLogout() {
    localStorage.removeItem('access-token');
    location.href = '/auth/sign-in';
  }
}
