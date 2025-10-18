import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../lay-out/header/header.component';
import { NavigationService } from '../../core/other/navigation.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-black text-white">
      <app-header></app-header>

      <main
        class="flex-1 flex flex-col justify-center items-center gap-6 text-center"
      >
        <!-- 🔥 Candle + Logo -->
        <div
          class="flex items-end justify-center gap-[0.15em] font-semibold tracking-wide"
        >
          <span
            class="text-[clamp(2.5rem,8vw,6rem)] leading-none select-none"
            >B</span
          >

          <!-- Candle replaces the "i" -->
          <div
            class="relative flex flex-col items-center justify-end -mb-[0.15em]"
            [style.height]="'clamp(2.5rem,8vw,6rem)'"
          >
            <div
              class="holder scale-[0.55] sm:scale-[0.7] md:scale-[0.9] lg:scale-[1]"
            >
              <div class="candle">
                <div class="blinking-glow"></div>
                <div class="thread"></div>
                <div class="glow"></div>
                <div class="flame"></div>
              </div>
            </div>
          </div>

          <span
            class="text-[clamp(2.5rem,8vw,6rem)] leading-none select-none"
            >rhan</span
          >
        </div>

        <div
          class="mt-4 text-gray-400 tracking-widest text-[clamp(1rem,2vw,1.6rem)]"
        >
          Academy
        </div>

        <!-- Button -->
        <button
          (click)="navigation.navigate('auth/sign-up')"
          class="!py-2 px-6 mt-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-semibold transition"
        >
          ለመጀመር ይመዝገቡ
        </button>
      </main>
    </div>
  `,
  styles: [
    `
      .holder {
        position: relative;
        width: clamp(35px, 6vw, 55px);
        height: clamp(90px, 20vh, 130px);
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }

      .candle {
        position: relative;
        width: 70%;
        height: 80%;
        border-radius: 150px / 40px;
        background: white;
      }

      .candle:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 20%;
        top: 0;
        border-radius: 50%;
      }

      .candle:after {
        content: '';
        position: absolute;
        width: 34%;
        height: 10%;
        left: 50%;
        transform: translateX(-50%);
        top: 14%;
        border-radius: 50%;
      }

      .thread {
        position: absolute;
        width: 6%;
        height: 18%;
        top: -12%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 40% 40% 0 0;
        background: linear-gradient(#d6994a, #4b232c, #121212, black, #e8bb31 90%);
        z-index: 1;
      }

      .flame {
        position: absolute;
        width: 24%;
        height: 70%;
        left: 50%;
        transform-origin: 50% 100%;
        transform: translateX(-50%);
        bottom: 100%;
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
        box-shadow: 0 0 15px rgba(247, 93, 0, 0.4),
          0 -6px 4px rgba(247, 128, 0, 0.7);
      }

      .glow {
        position: absolute;
        width: 26%;
        height: 40%;
        left: 50%;
        top: -38%;
        transform: translateX(-50%);
        border-radius: 50% 50% 35% 35%;
        background: rgba(0, 133, 255, 0.7);
        box-shadow: 0 -40px 30px 0 #dc8a0c, 0 40px 50px 0 #dc8a0c,
          inset 3px 0 2px rgba(0, 133, 255, 0.6),
          inset -3px 0 2px rgba(0, 133, 255, 0.6);
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
        filter: blur(60px);
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
          height: 70%;
        }
        50% {
          height: 85%;
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
}
