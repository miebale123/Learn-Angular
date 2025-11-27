import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header.component';
import { Footer } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>

      <main class="flex-1 pt-16 pb-8 px-4 sm:px-6 md:px-8 overflow-y-auto">
        <router-outlet></router-outlet>
      </main>

      <app-footer />
    </div>
  `,
})
export class AppLayout {}
