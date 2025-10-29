import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Shield, House, Bookmark, LogOut } from 'lucide-angular';
import { AuthStateService, UserRole } from '../../core/auth/auth-state.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  template: `
    <header
      class="fixed top-0 left-0 right-0 h-16 z-9999
             flex items-center justify-between
             bg-black text-white px-4 md:px-8 shadow-md"
    >
      <div class="flex items-center gap-2">
        <div
          class="w-6 h-6 bg-linear-to-br from-black via-red-400 to-black
                 flex items-center justify-center font-bold text-white rounded-full"
        >
          L
        </div>
        <span class="hidden md:inline text-lg font-bold ">Light</span>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap">
        <a routerLink="/get-houses" routerLinkActive="active-link" class="flex items-center gap-1">
          <lucide-icon [name]="house" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline">Home</span>
        </a>

        <a routerLink="/bookmarks" routerLinkActive="active-link" class="flex items-center gap-1">
          <lucide-icon [name]="bookmark" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline">Saved</span>
        </a>

        <button (click)="onNewPostClick()" class="flex items-center gap-1">
          <lucide-icon [name]="plus" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline">Post</span>
        </button>

        @if (auth.isAdmin()) {
        <a routerLink="/admin" class="flex items-center gap-1">
          <lucide-icon [name]="shield" class="w-5 h-5"></lucide-icon>
          <span class="hidden md:inline font-semibold">Admin</span>
        </a>
        }
      </nav>

      <!-- User Dropdown -->
      <div class="relative">
        <button
          (click)="toggleDropdown()"
          class="flex items-center gap-2 border-l border-gray-700 pl-3 focus:outline-none"
        >
          <div
            class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center
                   text-white font-bold uppercase"
          >
            {{ getInitial() }}
          </div>
          <p class="hidden md:block text-sm font-semibold truncate max-w-[120px]">
            {{ auth.userEmail() }}
          </p>
        </button>

        @if (dropdownOpen()) {
        <div
          class="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg
                   border border-gray-700 flex flex-col text-sm py-2 z-[10000]"
        >
          <button
            (click)="logout()"
            class="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-400 transition-all"
          >
            <lucide-icon [name]="logOut" class="w-5 h-5"></lucide-icon>
            Log out
          </button>
        </div>
        }
      </div>

      @if (warningMessage) {
      <p class="absolute top-16 right-4 bg-yellow-500 text-black px-4 py-1 rounded-md text-sm">
        {{ warningMessage }}
      </p>
      }
    </header>
  `,
})
export class Header {
  private router = inject(Router);
  private http = inject(HttpClient);
  private el = inject(ElementRef);
  auth = inject(AuthStateService);

  plus = Plus;
  shield = Shield;
  house = House;
  bookmark = Bookmark;
  logOut = LogOut;

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
    const role = this.auth.userRole();
    if (role === UserRole.Expert) {
      this.warningMessage = '';
      this.router.navigate(['/upload-house']);
    } else {
      this.warningMessage = 'Only Experts can create new posts.';
      setTimeout(() => (this.warningMessage = ''), 3000);
    }
  }

  logout() {
    this.auth.logout();
    this.dropdownOpen.set(false);
    this.router.navigate(['/']);
  }

  getInitial(): string {
    const email = this.auth.userEmail();
    if (!email) return '?';
    return email.charAt(0).toUpperCase();
  }

  async goToRender() {
    const res: any = await firstValueFrom(this.http.get(`https://learn-nest-kwvq.onrender.com/`));
    console.log(res.message);
  }
}
