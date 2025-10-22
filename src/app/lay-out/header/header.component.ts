// header.component.ts
import { Component, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  User as UserIcon,
  LogOut,
  Settings,
  LayoutDashboard,
} from 'lucide-angular';
import { AuthStateService } from '../../core/auth/auth-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
})
export class Header {
  private router = inject(Router);
  auth = inject(AuthStateService);

  UserIcon = UserIcon;
  LogOut = LogOut;
  Settings = Settings;
  DashBoard = LayoutDashboard;

  dropdownOpen = signal(false);

  toggleDropdown() {
    this.dropdownOpen.update((v) => !v);
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  go(path: string) {
    this.router.navigateByUrl(path);
    this.closeDropdown();
  }

  logout() {
    localStorage.removeItem('access-token');
    this.auth.setLoggedIn(false);
    this.closeDropdown();
    this.router.navigateByUrl('/auth/sign-in');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // if clicked inside dropdown or on the  → do nothing
    const insideDropdown = target.closest('.dropdown');
    const inside = target.closest('.profile-btn');

    if (!insideDropdown && !inside) {
      this.dropdownOpen.set(false);
    }
  }
}
