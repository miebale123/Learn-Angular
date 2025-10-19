import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-32 bg-gray-800">
      @for (course of courses; track $index) {
        <div class="flex flex-col items-center">
          <a
            routerLink="/Contents"
            class="animate-fade-in p-1 text-white text-center block rounded-md w-full"
            [ngStyle]="{
              background: color(),
              animationDelay: ($index * 0.3) + 's'
            }"
          >
            {{ course }}
          </a>

          <img
            [src]="images[$index]"
            class="h-80 w-full md:w-[700px] mt-1 object-cover rounded-md"
            [alt]="course"
          />
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: translateY(15px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.8s ease-in-out forwards;
      opacity: 0;
    }
  `],
})
export class CoursesComponent {
  courses = ['Food science', 'Geography', 'Math', 'Biology', 'Sport'];
  color = signal('#4b2e05'); // Shadow Fight 2–style brown-gold

  images = [
    'assets/watermelon.jpg',
    'assets/geography.jpg',
    'assets/math.jpg',
    'assets/biology.avif',
    'assets/soccer.jpg',
  ];

}
