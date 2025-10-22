import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="holder">
      <div class="candle">
        <div class="blinking-glow"></div>
        <div class="thread"></div>
        <div class="glow"></div>
        <div class="flame"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .holder {
        display: inline-flex;
        vertical-align: baseline;
        width: clamp(0.5rem, 4vw, 0.7em);
        height: clamp(2.2rem, 6vw, 5rem);
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
export class CandleComponent {}
