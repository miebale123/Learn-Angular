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
      @if(store.ad()) {

      <!-- AD ROTATION WRAPPER -->
      <div class="w-full flex flex-col items-center">
        <!-- FIXED HEIGHT CONTAINER -->
        <div class="relative w-full flex justify-center overflow-hidden" style="height: 125px">
          <!-- TEXT AD -->
          @if (currentAd() === 'text') {
          <div class="absolute inset-0 flex justify-center opacity-0 animate-fade py-4">
            <div
              class="flex flex-col md:flex-row items-center justify-between
          border border-gray-300 px-2 md:px-4 py-4 w-full md:w-2/4 bg-white"
            >
              <div class="flex flex-col text-center md:text-left">
                <p class="text-xl md:text-2xl font-medium text-gray-800 leading-tight">
                  Find your dream home faster by
                  <span class="font-bold">searching how you'd say it</span>
                  to a friend.
                </p>
              </div>

              <button
                class="bg-red-600 text-white px-8 md:px-10 py-3 rounded-full
            text-base font-bold whitespace-nowrap hover:bg-red-700 transition"
              >
                Try it now
              </button>
            </div>
          </div>
          }

          <!-- IMAGE AD -->
          <!-- @if (currentAd() === 'image') {
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 animate-fade py-4"
          >
            <img src="/assets/telecom-ad.png" class="h-20 w-[500px]" />
          </div>
          } -->
        </div>
      </div>

      }

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

  /** "text" → "image" → loop */
  currentAd = signal<'text' | 'image'>('text');

  constructor() {
    this.startRotation();
  }

  private startRotation() {
    setInterval(() => {
      this.currentAd.update((v) => (v === 'text' ? 'image' : 'text'));
    }, 6000); // each ad is visible for 6 seconds (matches animation)
  }
}
