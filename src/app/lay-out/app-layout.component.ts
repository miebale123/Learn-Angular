import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HousesStore } from '../houses/houses.store';
import { Header } from './header/header.component';
import { Footer } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      .animate-fade {
        animation: fadeInOut 6s ease-in-out forwards;
      }

      @keyframes fadeInOut {
        0% {
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `,
  ],
})
export class AppLayout {
  store = inject(HousesStore);
}
