import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#120a07] to-[#1e130c] overflow-hidden"
    >
      <div class="relative parchment w-[20%] max-w-5xl text-white p-12 md:p-24 shadow-2xl">
        <h1 class="text-4xl font-bold text-center mb-6 drop-shadow-md">
          Ancient Shadow Fight Background
        </h1>
        <p class="text-lg text-center opacity-90">
          Rough torn parchment edges — now properly visible in Angular.
        </p>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .parchment {
        background: radial-gradient(circle at 30% 30%, #e2c58a 0%, #c9a462 45%, #8b5e2b 100%);
        border: 2px solid rgba(50, 30, 10, 0.4);
        box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.9);
        filter: brightness(0.95) contrast(1.05);
        clip-path: polygon(
          5% 10%,
          20% 0%,
          35% 5%,
          50% 0%,
          65% 8%,
          80% 3%,
          95% 10%,
          100% 20%,
          95% 35%,
          100% 50%,
          95% 65%,
          100% 80%,
          90% 95%,
          75% 100%,
          60% 95%,
          45% 100%,
          30% 95%,
          15% 100%,
          5% 90%,
          0 75%,
          5% 50%,
          0 25%
        );
        position: relative;
      }

      .parchment::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-radial-gradient(
          circle at 50% 50%,
          rgba(255, 255, 255, 0.05) 0,
          rgba(255, 255, 255, 0.05) 2px,
          transparent 3px,
          transparent 6px
        );
        mix-blend-mode: overlay;
        opacity: 0.25;
        pointer-events: none;
      }
    `,
  ],
})
export class CoursesComponent {}
