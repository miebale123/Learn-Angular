import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  Input,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, SearchIcon, LoaderCircle } from 'lucide-angular';
import { HousesStore } from './houses.store';

@Component({
  selector: 'search-house',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="w-full relative">
      <div
        class="flex items-center w-full sm:w-[500px]
               bg-white rounded-full border border-black
               pl-4 pr-1 py-1"
      >
        <input
          type="text"
          class="flex-1 text-gray-900 placeholder-gray-400
                 focus:outline-none border-none p-3 px-8 text-lg"
          [placeholder]="placeholderText()"
          [ngModel]="store.searchLocation()"
          (ngModelChange)="store.set('searchLocation', $event)"
          (keydown.enter)="onSearchClick()"
        />

        <button
          class="w-10 h-10 rounded-full bg-black border border-gray-700
                 flex items-center justify-center hover:bg-gray-800"
          (click)="onSearchClick()"
        >
          @if (!searching()) {
            <lucide-icon [name]="s" class="w-5 h-5 text-white"></lucide-icon>
          }
          @if (searching()) {
            <lucide-icon [name]="lc" class="w-5 h-5 text-white animate-spin"></lucide-icon>
          }
        </button>
      </div>
    </div>
  `,
})
export class Search implements OnInit {
  store = inject(HousesStore);
  s = SearchIcon;
  lc = LoaderCircle;

  // -------------------
  // INPUT: ENABLE OR DISABLE SUGGESTIONS
  // -------------------
  @Input() trySuggestion = true;

  searching = signal(false);

  // -------------------
  // TYPEWRITER LOGIC
  // -------------------
  suggestions = [
    '200 sqft, and 200 sqft lot',
    '3 bedrooms with wood floors',
    '800k, 4 beds, 2 bathrooms',
  ];

  currentText = signal('');
  currentIndex = 0;
  charIndex = 0;
  typingForward = true;

  placeholderText = signal('');

  typewriterInterval: any;

  isPaused = false;

  PAUSE_AFTER_FINISH = 1200; // ms the full phrase stays

  startTypewriter() {
    this.typewriterInterval = setInterval(() => {
      if (this.isPaused) return;

      const phrase = this.suggestions[this.currentIndex];

      if (this.typingForward) {
        this.charIndex++;

        // Finished typing full phrase
        if (this.charIndex === phrase.length) {
          this.typingForward = false;
          this.isPaused = true;

          // Pause before deleting
          setTimeout(() => {
            this.isPaused = false;
          }, this.PAUSE_AFTER_FINISH);

          return;
        }
      } else {
        this.charIndex--;

        // Finished deleting
        if (this.charIndex === 0) {
          this.typingForward = true;
          this.currentIndex = (this.currentIndex + 1) % this.suggestions.length;

          this.isPaused = true;

          // Small pause before typing next phrase
          setTimeout(() => {
            this.isPaused = false;
          }, 300);

          return;
        }
      }

      this.currentText.set(phrase.substring(0, this.charIndex));
      this.placeholderText.set(`Try “${this.currentText()}”`);
    }, 70);
  }


  stopTypewriter() {
    clearInterval(this.typewriterInterval);
  }

  // -------------------
  // SEARCH EVENT
  // -------------------
  @Output() search = new EventEmitter<string>();

  async onSearchClick() {
    this.searching.set(true);

    await new Promise((r) => setTimeout(r, 1000));

    this.searching.set(false);
    this.search.emit(this.store.searchLocation()!);
  }

  // -------------------
  // RESPONSIVE DETECTION
  // -------------------
  isMobile = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
    this.updatePlaceholderMode();
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
    this.updatePlaceholderMode();

    if (this.trySuggestion) {
      this.startTypewriter();
    } else {
      this.placeholderText.set('Search address, school, city...');
    }
  }

  updatePlaceholderMode() {
    if (!this.trySuggestion) return;

    this.placeholderText.set(`Try “${this.currentText()}”`);
  }
}
