import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="min-h-screen flex flex-col items-center justify-start
                bg-gradient-to-b from-[#a87b56] via-[#c6a97b] to-[#8c6b4f]
                p-6 md:p-12"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        @for (course of courses; track $index) {
        <div
          class="relative flex flex-col items-center fade-wrapper"
          [style.animation-delay]="$index * 0.3 + 's'"
        >
          <!-- top roll -->
          <div
            class="roll-top animate-roll-shrink"
          ></div>

          <!-- scroll body -->
          <div class="scroll-body animate-unroll" [style.animation-delay]="$index * 0.3 + 's'">
            <a routerLink="/Contents" class="text-xl md:text-2xl font-bold text-center block mb-3">
              {{ course }}
            </a>
            <img
              [src]="images[$index]"
              [alt]="course"
              class="h-40 md:h-56 w-full object-cover rounded-md shadow-md mb-2"
            />
            <p class="text-center text-sm md:text-base opacity-90">
              Explore {{ course }} resources and tools.
            </p>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .roll-top {
        width: 100%;
        height: 20px;
        background: linear-gradient(to bottom, #e2c58a, #b18a4c);
        border-radius: 9999px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), 0 2px 5px rgba(0, 0, 0, 0.7);
        transform-origin: top center;
        z-index: 3;
        position: relative;
      }

      .scroll-body {
        width: 100%;
        background: radial-gradient(circle at 30% 30%, #e2c58a, #c9a462 40%, #8b5e2b 100%);
        border-left: 2px solid rgba(60, 35, 15, 0.4);
        border-right: 2px solid rgba(60, 35, 15, 0.4);
        box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.6);
        transform-origin: top;
        transform: scaleY(0) translateY(20px);
        opacity: 0.95;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      @keyframes rollShrink {
        0% {
          height: 20px;
        }
        50% {
          height: 15px;
        }
        100% {
          height: 10px;
        }
      }

      @keyframes unroll {
        from {
          transform: scaleY(0) translateY(20px);
        }
        to {
          transform: scaleY(1) translateY(0);
        }
      }

      .animate-unroll {
        animation: unroll 1.5s ease-out forwards;
      }

      .animate-roll-shrink {
        animation: rollShrink 1.5s ease-out forwards;
      }

      .fade-wrapper {
        opacity: 0;
        animation: fadeIn 1s ease forwards;
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class CoursesComponent {
  courses = ['Food Science', 'Geography', 'Math', 'Biology', 'Sport'];
  images = [
    '../../assets/watermelon.jpg',
    'assets/geography.jpg',
    'assets/math.jpg',
    'assets/biology.avif',
    'assets/soccer.jpg',
  ];
}
