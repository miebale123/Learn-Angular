import { Component, signal, effect, OnInit } from '@angular/core';

@Component({
  selector: 'try-search-suggestions',
  standalone: true,
  template: `
    <div class="relative w-full">
      <input
        type="text"
        class="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm
           text-gray-700 placeholder-gray-400"
        [placeholder]="'Try “' + currentText() + '”'"
      />
    </div>
  `,
})
export class TrySearchSuggestions implements OnInit {
  suggestions = [
    '200 sqft, and 200 sqft lot',
    '3 bedrooms with wood floors',
    '800k, 4 beds, 2 bathrooms',
  ];

  currentText = signal('');
  currentIndex = 0;
  charIndex = 0;
  typingForward = true;

  ngOnInit() {
    this.startTypewriter();
  }

  startTypewriter() {
    setInterval(() => {
      const phrase = this.suggestions[this.currentIndex];

      if (this.typingForward) {
        this.charIndex++;
        if (this.charIndex === phrase.length) {
          this.typingForward = false;
          return;
        }
      } else {
        this.charIndex--;
        if (this.charIndex === 0) {
          this.typingForward = true;
          this.currentIndex = (this.currentIndex + 1) % this.suggestions.length;
        }
      }

      this.currentText.set(phrase.substring(0, this.charIndex));
    }, 70);
  }
}
