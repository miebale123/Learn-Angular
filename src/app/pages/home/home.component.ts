import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import animationData from '../../../assets/programmer.json';
import { HeaderComponent } from '../../lay-out/header/header.component';
import { NavigationService } from '../../core/other/navigation.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LottieComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-black text-white">
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
          <span class="text-[clamp(3rem,9vw,7rem)] select-none">B</span>

          <!-- Candle replaces "i" -->
          <span class="inline-flex">
            <div class="holder">
              <div class="candle">
                <div class="blinking-glow"></div>
                <div class="thread"></div>
                <div class="glow"></div>
                <div class="flame"></div>
              </div>
            </div>
          </span>

          <span class="text-[clamp(3rem,9vw,7rem)] select-none">rhan</span>
        </div>

        <div class="mt-3 text-gray-400 tracking-widest text-[clamp(1.2rem,2.2vw,1.8rem)]">
          Academy
        </div>

        <p
          class="text-lg sm:text-2xl md:text-3xl max-w-md sm:max-w-lg px-3 text-gray-200 leading-relaxed"
        >
          our education quality matters! let's learn together!
        </p>

        <!-- CTA BUTTON -->
        <button
          (click)="navigation.navigate('auth/sign-up')"
          class="py-3 px-6 mt-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Register here &rarr;
        </button>
      </main>

      <!-- ANIMATION SECTION -->
      <section
        class="bg-gradient-to-r from-indigo-500 to-blue-400 text-gray-600 font-bold text-lg sm:text-xl md:text-2xl mt-12 w-full overflow-hidden"
      >
        <svg viewBox="0 0 1440 200" class="fill-black w-full">
          <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
        </svg>

        <div
          class="flex flex-col md:flex-row justify-center items-center md:h-[400px] gap-10 md:gap-20 p-6"
        >
          <p
            class="max-w-[320px] sm:max-w-[400px] md:max-w-[500px] text-center md:text-left leading-relaxed"
          >
            <!-- WHAT WE OFFER SECTION -->
          </p>

          <section class=" text-white  text-center">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">What We Offer</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <!-- Item 1 -->
              <div
                class="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div class="bg-yellow-500 text-black p-4 rounded-full">
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
                      d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold">Latest Resources</h3>
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Access the latest and most important computer knowledge resources and tools.
                </p>
              </div>

              <!-- Item 2 -->
              <div
                class="flex flex-col items-center gap-4 p-6  rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div class="bg-green-500 text-black p-4 rounded-full">
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
                      d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7M4 17h16M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2M4 17l2-2m14 2l-2-2"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold">Software Tools</h3>
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Discover engineering, health, and general knowledge information software tools.
                </p>
              </div>

              <!-- Item 3 -->
              <div
                class="flex flex-col items-center gap-4 p-6  rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
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

          <div class="w-[250px] sm:w-[350px] md:w-[450px]">
            <ng-lottie
              [options]="options"
              (animationCreated)="animationCreated($event)"
            ></ng-lottie>
          </div>
        </div>

        <svg viewBox="0 0 1440 200" class="fill-gray-500 w-full">
          <path
            d="M0,160C80,120,160,80,320,80C480,80,560,160,720,160C880,160,960,80,1120,50C1280,16,1360,80,1440,0L1440,320L0,320Z"
          ></path>
        </svg>
      </section>

      <!-- FAMILY SECTION -->
      <section
        class="bg-gray-500 flex flex-col md:flex-row items-center justify-center md:h-[400px] gap-10 md:gap-20 text-red-200 font-bold text-xl md:text-3xl p-6 text-center"
      >
        <p class="max-w-[450px] leading-relaxed">Family happy</p>
      </section>
    </div>
  `,
  styles: [
    `
      /* Candle proportional scaling with baseline alignment */
      .holder {
        display: inline-flex;
        vertical-align: baseline;
        width: clamp(0.5rem, 4vw, 0.7em); /* slightly wider */
        height: clamp(2.2rem, 6vw, 5rem); /* slightly taller wax */
        justify-content: center;
        align-items: flex-end;
      }

      .candle {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 0.35em / 0.2em;
        background: white;
      }

      .thread {
        position: absolute;
        width: 8%;
        height: 14%;
        top: -14%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 40% 40% 0 0;
        background: linear-gradient(#d6994a, #4b232c, #121212, black, #e8bb31 90%);
        z-index: 1;
      }

      /* Slightly bigger and responsive flame */
      .flame {
        position: absolute;
        width: clamp(40%, 2.5vw, 24%);
        height: clamp(35%, 4vw, 42%);
        left: 50%;
        bottom: 100%;
        transform-origin: 50% 100%;
        transform: translateX(-50%);
        border-radius: 50% 50% 20% 20%;
        background: linear-gradient(white 80%, transparent);
        animation: moveFlame 5s ease-in-out infinite, enlargeFlame 3s ease-in-out infinite;
      }

      .flame:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50% 50% 20% 20%;
        box-shadow: 0 0 15px rgba(247, 93, 0, 0.4), 0 -6px 4px rgba(247, 128, 0, 0.6);
      }

      .glow {
        position: absolute;
        width: clamp(18%, 1.8vw, 20%);
        height: 32%;
        left: 50%;
        top: -38%;
        transform: translateX(-50%);
        border-radius: 50% 50% 35% 35%;
        background: rgba(0, 133, 255, 0.7);
        box-shadow: 0 -35px 25px 0 #dc8a0c, 0 35px 45px 0 #dc8a0c,
          inset 2px 0 2px rgba(0, 133, 255, 0.5), inset -2px 0 2px rgba(0, 133, 255, 0.5);
      }

      .blinking-glow {
        position: absolute;
        width: 100%;
        height: 120%;
        left: 50%;
        top: -60%;
        transform: translateX(-50%);
        border-radius: 50%;
        background: #ff6000;
        filter: blur(55px);
        animation: blinkIt 0.12s infinite;
      }

      @keyframes moveFlame {
        0% {
          transform: translateX(-50%) rotate(-6deg);
        }
        25% {
          transform: translateX(-50%) rotate(8deg);
        }
        50% {
          transform: translateX(-50%) rotate(-10deg);
        }
        75% {
          transform: translateX(-50%) rotate(6deg);
        }
        100% {
          transform: translateX(-50%) rotate(-6deg);
        }
      }

      @keyframes enlargeFlame {
        0%,
        100% {
          height: clamp(35%, 4vw, 42%);
        }
        50% {
          height: clamp(38%, 4.2vw, 45%);
        }
      }

      @keyframes blinkIt {
        50% {
          opacity: 0.7;
        }
      }
    `,
  ],
})
export class HomeComponent {
  navigation = inject(NavigationService);

  options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  animationCreated(animation: any) {
    animation.setSpeed(1.5);
  }
}
