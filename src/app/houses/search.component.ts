import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, SearchIcon, LoaderCircle } from 'lucide-angular';
import { HousesStore } from './houses.store';

@Component({
  selector: 'search-house',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
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
        (ngModelChange)="store.setSearchLocation($event)"
      />

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
  `,
})
export class Search {
  store = inject(HousesStore);
  s = SearchIcon;
  lc = LoaderCircle;
  searching = signal(false);

  @Output() search = new EventEmitter<string>();

  async onSearchClick() {
    this.searching.set(true);

    await new Promise((r) => setTimeout(r, 500));

    this.searching.set(false);

    // Emit current search value
    this.search.emit(this.store.searchLocation()!);
  }
}
