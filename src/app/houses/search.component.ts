import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HousesStore } from './houses.store';
import { LucideAngularModule, Heart, SearchIcon, LoaderCircle } from 'lucide-angular';

@Component({
  selector: 'search-house',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col sm:flex-row items-center gap-4 w-full mt-4">
      <div
        class="flex items-center w-full sm:w-[500px]
           bg-white rounded-full border border-gray-300
           px-4 py-2 shadow-sm
           focus-within:ring-2 focus-within:ring-black"
      >
        <input
          type="text"
          placeholder="Try Addis Ababa, Bole…"
          class="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none border-none"
          [ngModel]="store.searchLocation()"
          (ngModelChange)="this.store.setSearchLocation($event)"
        />

        <!-- Search Icon Button -->
        <button
          class="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800"
          (click)="onSearchClick()"
        >
          @if(!searching()) {
          <lucide-icon [name]="s" class="w-5 h-5 text-white"></lucide-icon>
          } @if(searching()) {
          <lucide-icon [name]="lc" class="w-5 h-5 text-white animate-spin"></lucide-icon>
          }
        </button>
      </div>
    </div>
  `,
})
export class Search {
  store = inject(HousesStore);

  heart = Heart;

  lc = LoaderCircle;
  s = SearchIcon;
  priceDropdownOpen = signal(false);

  async ngOnInit() {
    await this.store.getHouses();
  }

  searching = signal(false);

  async onSearchClick() {
    this.searching.set(true);
    this.store.resetSearchLocation();

    await new Promise((resolve) => setTimeout(resolve, 2500));

    this.searching.set(false);

    await this.store.getHouses();
  }
}
