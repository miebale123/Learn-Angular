import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Plus,
  Shield,
  House,
  Bookmark,
  LogOut,
  Bell,
  Menu,
  X,
} from 'lucide-angular';
import { HousesStore } from '../../houses/houses.store';
import { AuthStateService, UserRole } from '../../pages/auth-sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between
       px-4 md:px-8 py-2 bg-blue-500 text-white"
    >
      <!-- LEFT SECTION -->
      <div class="flex items-center gap-3">
        <!-- Mobile Hamburger -->
        <button class="md:hidden" (click)="do()">
          <lucide-icon [name]="menu" class="w-6 h-6"></lucide-icon>
        </button>

        <!-- Logo -->
        <a routerLink="/" routerLinkActive="active-link">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center bg-red-200 text-black font-bold">
              L
            </div>

            <div class="hidden md:flex">
              <span class="text-lg font-bold">Lumina</span>
              <span class="text-lg font-bold">.com</span>
            </div>
          </div>
        </a>
      </div>

      <!-- DESKTOP NAV -->
      <nav class="hidden md:flex items-center gap-6">
        <a routerLink="/bookmarks" class="flex items-center gap-1">
          <span>Saved</span>
        </a>

        <button (click)="onNewPostClick()" class="flex items-center gap-1">
          <lucide-icon [name]="plus" class="w-5 h-5"></lucide-icon>
          <span>Rent/Sell</span>
        </button>

        @if (auth.isAdmin()) {
        <a routerLink="/admin" class="flex items-center gap-1">
          <lucide-icon [name]="shield" class="w-5 h-5"></lucide-icon>
          <span>Admin</span>
        </a>
        } @if (auth.isExpert()) {
        <a routerLink="/my-houses" class="flex items-center gap-1">
          <span>Agent</span>
        </a>
        }

        <a
          routerLink="/notifications"
          (click)="store.resetNCounter()"
          class="relative flex items-center"
        >
          <lucide-icon [name]="bell" class="w-5 h-5"></lucide-icon>

          @if (store.notificationCounter()) {
          <div
            class="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full
                 w-3 h-3 flex items-center justify-center"
          >
            {{ store.notificationCounter() }}
          </div>
          }
        </a>

        @if (!auth.isLoggedIn()) {
        <button (click)="go('auth/sign-in')" class="text-sm hover:underline">Sign in</button>

        <button
          (click)="go('auth/sign-up')"
          class="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
        >
          Sign up
        </button>
        } @if (auth.isLoggedIn()) {
        <div class="relative">
          <button (click)="toggleDropdown()" class="flex items-center gap-2 pl-3">
            <div
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold uppercase"
            >
              {{ getInitial() }}
            </div>
          </button>

          @if (dropdownOpen()) {
          <div class="absolute left-0 mt-2 w-44 bg-gray-700 rounded-lg shadow-lg text-sm py-2">
            <p class="px-4 pb-2 text-gray-300 border-b border-gray-600 text-xs">
              {{ auth.userEmail() }}
            </p>

            <button (click)="go('settings')" class="px-4 py-2 text-gray-200 hover:bg-gray-600">
              Settings
            </button>

            <button
              (click)="logout()"
              class="px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center gap-2"
            >
              <lucide-icon [name]="logOut" class="w-5 h-5"></lucide-icon>
              Log out
            </button>
          </div>
          }
        </div>
        }
      </nav>
    </header>

    @if (mobileOpen()) {
    <!-- BACKDROP -->
    <div class="fixed inset-0 bg-black/40 z-[9998]" (click)="closeMobile()"></div>

    <!-- RIGHT-SIDE DRAWER -->
    <div
      class="fixed top-0 left-0 h-full w-72 bg-blue-600 text-white z-[9999] shadow-xl
           p-6 flex flex-col gap-6 transition-transform duration-300 translate-x-0"
    >
      <!-- CLOSE BUTTON -->
      <button class="self-end" (click)="closeMobile()">
        <lucide-icon [name]="x" class="w-6 h-6 rotate-90"></lucide-icon>
        <!-- lucide has no X by default in your imports, so we rotate menu to mimic X -->
      </button>

      <!-- MENU ITEMS -->
      <a routerLink="/bookmarks" (click)="closeMobile()" class="flex items-center gap-2"> Saved </a>

      <button (click)="onNewPostClick(); closeMobile()" class="flex items-center gap-2">
        <lucide-icon [name]="plus" class="w-5 h-5"></lucide-icon>
        Rent/Sell
      </button>

      @if (auth.isAdmin()) {
      <a routerLink="/admin" (click)="closeMobile()" class="flex items-center gap-2">
        <lucide-icon [name]="shield" class="w-5 h-5"></lucide-icon>
        Admin
      </a>
      } @if (auth.isExpert()) {
      <a routerLink="/my-houses" (click)="closeMobile()" class="flex items-center gap-2"> Agent </a>
      }

      <a
        routerLink="/notifications"
        (click)="store.resetNCounter(); closeMobile()"
        class="flex items-center gap-2"
      >
        <lucide-icon [name]="bell" class="w-5 h-5"></lucide-icon>
        Notifications
      </a>

      @if (!auth.isLoggedIn()) {
      <button (click)="go('auth/sign-in'); closeMobile()" class="block text-left">Sign in</button>
      <button (click)="go('auth/sign-up'); closeMobile()" class="block text-left">Sign up</button>
      } @if (auth.isLoggedIn()) {
      <button (click)="go('settings'); closeMobile()" class="block text-left">Settings</button>
      <button (click)="logout(); closeMobile()" class="block text-left">Log out</button>
      }
    </div>
    }
  `,
})
export class Header {
  router = inject(Router);
  auth = inject(AuthStateService);
  store = inject(HousesStore);
  el = inject(ElementRef);

  plus = Plus;
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

  menu = Menu;
  mobileOpen = signal(false);

  closeMobile() {
    this.mobileOpen.set(false);
  }

  do() {
    this.mobileOpen.update((v) => !v);
  }
}
