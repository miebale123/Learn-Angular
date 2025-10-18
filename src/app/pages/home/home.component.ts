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
      <main class="flex-1 flex flex-col justify-start items-center text-center gap-6 px-4 pt-24 md:pt-32 lg:pt-40">
        <span class="text-xl sm:text-2xl md:text-3xl text-gray-400">welcome to</span>

        <!-- LOGO + CANDLE -->
        <div class="flex items-baseline justify-center font-semibold tracking-wide leading-none gap-1.5">
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

        <p class="text-lg sm:text-2xl md:text-3xl max-w-md sm:max-w-lg px-3 text-gray-200 leading-relaxed">
          our education quality matters! let's learn together!
        </p>

        <!-- CTA BUTTON -->
        <button
          (click)="navigation.navigate('auth/sign-up')"
          class="py-3 px-6 mt-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          ለመጀመር ይመዝገቡ
        </button>
      </main>

      <!-- ANIMATION SECTION -->
      <section class="bg-gradient-to-r from-indigo-100 to-blue-400 text-gray-600 font-bold text-lg sm:text-xl md:text-2xl mt-12 w-full overflow-hidden">
        <svg viewBox="0 0 1440 200" class="fill-black w-full">
          <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
        </svg>

        <div class="flex flex-col md:flex-row justify-center items-center md:h-[400px] gap-10 md:gap-20 p-6">
          <p class="max-w-[320px] sm:max-w-[400px] md:max-w-[500px] text-center md:text-left leading-relaxed">
            ተምሃሮ ናይ ኮምፒዩተር ፍልጠት ንክቀስሙ ዝለዓለ ፃዕሪ ንገብር
          </p>

          <div class="w-[250px] sm:w-[350px] md:w-[450px]">
            <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>
          </div>
        </div>

        <svg viewBox="0 0 1440 200" class="fill-gray-500 w-full">
          <path d="M0,160C80,120,160,80,320,80C480,80,560,160,720,160C880,160,960,80,1120,50C1280,16,1360,80,1440,0L1440,320L0,320Z"></path>
        </svg>
      </section>

      <!-- FAMILY SECTION -->
      <section class="bg-gray-500 flex flex-col md:flex-row items-center justify-center md:h-[400px] gap-10 md:gap-20 text-red-200 font-bold text-xl md:text-3xl p-6 text-center">
        <img
          src="../../assets/family.jpg"
          alt="Family"
          class="w-[90%] sm:w-[65%] md:w-[45%] lg:w-[35%] rounded-lg shadow-lg object-cover"
        />
        <p class="max-w-[450px] leading-relaxed">
          ወለዲ ብናይ ደቆም ጉብዝና ይሕጎሱ
        </p>
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
        height: clamp(2.2rem, 6vw, 5rem);  /* slightly taller wax */
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
          inset 2px 0 2px rgba(0, 133, 255, 0.5),
          inset -2px 0 2px rgba(0, 133, 255, 0.5);
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
        0% { transform: translateX(-50%) rotate(-6deg); }
        25% { transform: translateX(-50%) rotate(8deg); }
        50% { transform: translateX(-50%) rotate(-10deg); }
        75% { transform: translateX(-50%) rotate(6deg); }
        100% { transform: translateX(-50%) rotate(-6deg); }
      }

      @keyframes enlargeFlame {
        0%,100% { height: clamp(35%, 4vw, 42%); }
        50% { height: clamp(38%, 4.2vw, 45%); }
      }

      @keyframes blinkIt { 50% { opacity: 0.7; } }
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
