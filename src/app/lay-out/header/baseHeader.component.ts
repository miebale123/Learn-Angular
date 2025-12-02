import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Plus, Shield, House, Bookmark, LogOut, Bell, Menu, X, Heart } from 'lucide-angular';
import { HousesStore } from '../../houses/houses.store';
import { AuthStateService } from '../../auth/auth-state.service';

@Directive()
export abstract class BaseHeader {
  router = inject(Router);
  auth = inject(AuthStateService);
  store = inject(HousesStore);
  el = inject(ElementRef);

  plus = Plus;
  heart = Heart;
  shield = Shield;
  x = X;
  house = House;
  bookmark = Bookmark;
  logOut = LogOut;
  bell = Bell;

  dropdownOpen = signal(false);
  warningMessage = '';

  toggleDropdown() {
    this.dropdownOpen.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }

  onNewPostClick() {
    if (this.auth.isLoggedIn()) {
      this.warningMessage = '';
      this.router.navigate(['/upload-house']);
      return;
    }

    this.warningMessage = 'please log in to upload house';
    setTimeout(() => (this.warningMessage = ''), 3000);
  }

  logout() {
    this.auth.logout();
    this.dropdownOpen.set(false);
  }

  getInitial(): string {
    const email = this.auth.userEmail();
    return email ? email.charAt(0).toUpperCase() : '?';
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  menu = Menu;
  mobileOpen = signal(false);

  closeMobile() {
    this.mobileOpen.set(false);
  }

  do() {
    this.mobileOpen.update((v) => !v);
  }

  authMode: 'sign-in' | 'sign-up' = 'sign-in';

  openAuth(mode: 'sign-in' | 'sign-up') {
    this.authMode = mode;
    this.store.showAuthModal(true);
  }

  closeAuth() {
    this.store.showAuthModal(false);
  }
}
