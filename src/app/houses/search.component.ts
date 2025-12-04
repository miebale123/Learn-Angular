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
    <div class="w-full ">
      <div
        class="flex items-center w-full sm:w-[500px]
               bg-white rounded-full border border-black
                pr-1 py-1"
      >
        <input
          type="text"
          class="flex-1 text-gray-900 placeholder-gray-400
                 focus:outline-none border-none p-3 px-8 text-lg"
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
          } @if (searching()) {
          <lucide-icon [name]="lc" class="w-5 h-5 text-white animate-spin"></lucide-icon>
          }
        </button>
      </div>
    </div>
  `,
})
export class Search  {
  store = inject(HousesStore);
  s = SearchIcon;
  lc = LoaderCircle;

  @Output() search = new EventEmitter<string>();

  @Input() trySuggestion = true;

  searching = signal(false);

  async onSearchClick() {
    this.searching.set(true);

    await new Promise((r) => setTimeout(r, 1000));

    this.searching.set(false);
    this.search.emit(this.store.searchLocation()!);
  }
}
