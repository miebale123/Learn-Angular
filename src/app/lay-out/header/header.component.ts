import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Shield, House, Bookmark, LogOut, Bell } from 'lucide-angular';
import { HousesStore } from '../../houses/houses.store';
import { AuthStateService, UserRole } from '../../pages/auth-sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  template: `
    <!-- [ngClass]="auth.isLoggedIn() ? 'bg-gray-300 text-black' : 'bg-black text-white'" -->
    <header
      class="fixed top-0 left-0 right-0 h-16 z-9999 flex items-center justify-between px-4 md:px-8 shadow-md"
    >
      <!-- Navigation -->
      <nav class="flex items-center gap-4 sm:gap-6 flex-wrap">
        <!-- Logo -->
        <a routerLink="/houses" routerLinkActive="active-link">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center">
              @if(auth.isLoggedIn()){
              <img src="/assets/icons/home2.jpeg" />
              }@else{
              <img src="/assets/icons/home.png" />
              }
            </div>

            <!-- Text only on desktop -->
            <div class="hidden md:flex">
              <span class="text-lg font-bold">Lumina</span>
              <span class="text-lg font-bold">.com</span>
            </div>
          </div>
        </a>

        <!-- Saved -->
        <a routerLink="/bookmarks" routerLinkActive="active-link" class="flex items-center gap-1">
          <lucide-icon [name]="bookmark" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline">Saved</span>
        </a>

        <!-- Post -->
        <button (click)="onNewPostClick()" class="flex items-center gap-1">
          <lucide-icon [name]="plus" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline">Rent/Sell</span>
        </button>

        <!-- Admin -->
        @if (auth.isAdmin()) {
        <a routerLink="/admin" class="flex items-center gap-1">
          <lucide-icon [name]="shield" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline">Admin</span>
        </a>
        }

        <!-- Agent -->
        @if (auth.isExpert()) {
        <a routerLink="/my-houses" class="flex items-center gap-1">
          <span class="hidden md:inline">Agent</span>
        </a>
        }

        <!-- Notifications -->
        <a
          routerLink="/notifications"
          (click)="store.resetNCounter()"
          class="relative flex items-center gap-2"
        >
          <lucide-icon [name]="bell" class="w-5 h-5"></lucide-icon>

          @if (store.notificationCounter()) {
          <div
            class="absolute -top-1 -right-1 bg-red-500  text-xs font-bold
                   rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ store.notificationCounter() }}
          </div>
          }

          <span class="hidden md:inline">Notifications</span>
        </a>
      </nav>

      <!-- Auth: Logged Out -->
      @if (!auth.isLoggedIn()) {
      <div class="flex items-center gap-4">
        <button (click)="go('auth/sign-in')" class="text-sm hover:underline">Sign in</button>

        <button
          (click)="go('auth/sign-up')"
          class="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
        >
          Sign up
        </button>
      </div>
      }

      <!-- Auth: Logged In -->
      <!-- Auth: Logged In -->
      @if (auth.isLoggedIn()) {
      <div class="relative">
        <!-- Avatar -->
        <button (click)="toggleDropdown()" class="flex items-center gap-2 pl-3">
          <div
            class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center
               font-bold uppercase"
          >
            {{ getInitial() }}
          </div>
        </button>

        <!-- Dropdown -->
        @if (dropdownOpen()) {
        <div
          class="absolute right-0 mt-2 w-44 bg-gray-700 rounded-lg shadow-lg
               flex flex-col text-sm py-2 z-50"
        >
          <!-- Email (non-clickable) -->
          <p class="px-4 pb-2 text-gray-300 border-b border-gray-600 text-xs">
            {{ auth.userEmail() }}
          </p>

          <!-- Settings -->
          <button
            class="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-600"
            (click)="go('settings')"
          >
            Settings
          </button>

          <!-- Logout -->
          <button
            (click)="logout()"
            class="flex items-center gap-2 px-4 py-2  text-gray-200 hover:bg-gray-600"
          >
            <lucide-icon [name]="logOut" class="w-5 h-5"></lucide-icon>
            Log out
          </button>
        </div>
        }
      </div>
      }

      <!-- Warning -->
      @if (warningMessage) {
      <p class="absolute top-16 right-4 bg-yellow-500 text-black px-4 py-1 rounded-md text-sm">
        {{ warningMessage }}
      </p>
      }
    </header>
  `,
})
export class Header {
  router = inject(Router);
  auth = inject(AuthStateService);
  store = inject(HousesStore);
  el = inject(ElementRef);

  plus = Plus;
  shield = Shield;
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
    const isBroker = this.auth.userRoles().includes(UserRole.Expert);

    if (isBroker) {
      this.warningMessage = '';
      this.router.navigate(['/upload-house']);
      return;
    }

    this.warningMessage = 'Only Brokers can create new posts. please call us at 09... to post.';
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
}
