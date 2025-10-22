import { Component, ElementRef, inject, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import animationData from '../../../assets/programmer.json';
import { Header } from '../../lay-out/header/header.component';
import { NavigationService } from '../../core/other/navigation.service';
import { CandleComponent } from '../../candle.component';
import { Courses } from '../../courses.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, Header, LottieComponent, CandleComponent, Courses],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>

      <!-- HERO SECTION -->
      <main
        class="flex-1 flex flex-col justify-start items-center text-center gap-6 px-4 pt-8 md:pt-20 lg:pt-40"
      >
        <span class="text-xl sm:text-2xl md:text-3xl text-gray-400">welcome to</span>

        <!-- LOGO + CANDLE -->
        <div
          class="flex items-baseline justify-center font-semibold tracking-wide leading-none gap-1.5"
        >
          <span class="text-[clamp(3rem,9vw,7rem)] select-none">Lum</span>
          <app-candle></app-candle>
          <span class="text-[clamp(3rem,9vw,7rem)] select-none">na</span>
        </div>

        <p
          class="text-lg sm:text-2xl md:text-3xl max-w-md sm:max-w-lg px-3 text-gray-200 leading-relaxed"
        >
          The what, the why, the how, ...
        </p>

        <button
          (click)="navigation.navigate('auth/sign-up')"
          class="py-3 px-6 mt-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Register here &rarr;
        </button>
      </main>

      <!-- FEATURES SECTION -->
      <section
        class="bg-gradient-to-r from-indigo-500 to-blue-400 text-gray-600 font-bold text-lg sm:text-xl md:text-2xl mt-12 w-full overflow-hidden"
      >
        <svg viewBox="0 0 1440 200" class="fill-black w-full">
          <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
        </svg>

        <div
          class="flex flex-col md:flex-row justify-center items-center md:h-[400px] gap-10 md:gap-20 p-6"
        >
          <section class="text-white text-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div
                class="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div class="bg-yellow-500 text-black p-4 rounded-full"></div>
                <h3 class="text-xl font-semibold">Latest Resources</h3>
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Access the latest and most important computer knowledge resources and tools.
                </p>
              </div>

              <div
                class="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div class="bg-green-500 text-black p-4 rounded-full"></div>
                <h3 class="text-xl font-semibold">Software Tools</h3>
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Discover new infos about engineering, health...
                </p>
              </div>

              <div
                class="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div class="bg-blue-500 text-black p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold">Guided Understanding</h3>
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Gain clear understanding of tools, resources, and their context for practical use.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- COURSES SECTION -->
      <section #coursesSection>
        @if (showCourses()) {
        <app-courses class="opacity-0 animate-fade-in" />
        } @else {
        <div class="text-center text-gray-400 py-20">Loading courses...</div>
        }
      </section>
    </div>
  `,
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 1.2s ease-out forwards;
      }
    `,
  ],
})
export class Home implements AfterViewInit {
  navigation = inject(NavigationService);
  showCourses = signal(false);

  options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  @ViewChild('coursesSection', { static: true }) coursesSection!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          this.showCourses.set(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(this.coursesSection.nativeElement);
  }

  animationCreated(animation: any) {
    animation.setSpeed(1.5);
  }
}
