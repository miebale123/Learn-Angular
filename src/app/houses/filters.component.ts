import { Component, inject, signal } from '@angular/core';
import { ArrowDown, ChevronDown, LucideAngularModule } from 'lucide-angular';
import { HousesStore } from './houses.store';

@Component({
  selector: 'filters',
  imports: [LucideAngularModule, ],
  template: `
    <!-- Price Filter -->
    <div class="relative sm:w-auto w-full">
      <button
        class="w-full sm:w-40 px-4 py-2 bg-white border border-gray-300
             rounded-full flex items-center justify-between
             shadow-sm font-medium text-gray-700"
        (click)="priceOpen.set(!priceOpen())"
      >
        Price
        <lucide-icon [name]="cdown" class="w-4 h-4 text-black"></lucide-icon>
      </button>

      @if(priceOpen()) {
      <div
        class="absolute mt-3 bg-white border border-gray-200 rounded-xl shadow-xl
             w-72 p-4 z-50"
      >
        <div class="font-semibold mb-3 text-gray-700">Price Range</div>

        <div class="flex items-center gap-3 mb-3">
          <!-- Min Price -->
          <div class="relative flex-1">
            <button
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-left
                   bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
              (click)="toggleMinDropdown()"
            >
              {{ store.minPrice() ? store.minPrice() : 'No min' }}
              <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-400"></lucide-icon>
            </button>

            @if(minPriceOpen()) {
            <ul
              class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg
                   max-h-40 overflow-y-auto shadow z-50"
            >
              <li
                class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                (mousedown)="store.setMinPrice(null); minPriceOpen.set(false)"
              >
                No min
              </li>

              @for(price of store.priceOptions(); track $index) {
              <li
                class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                (mousedown)="store.setMinPrice(price); minPriceOpen.set(false)"
              >
                {{ price }}
              </li>
              }
            </ul>
            }
          </div>

          <span class="text-gray-400">-</span>

          <!-- Max Price -->
          <div class="relative flex-1">
            <button
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left
                   hover:bg-gray-100 transition flex items-center justify-between"
              (click)="toggleMaxDropdown()"
            >
              {{ store.maxPrice() ? store.maxPrice() : 'No max' }}
              <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-400"></lucide-icon>
            </button>

            @if(maxPriceOpen()) {
            <ul
              class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg
                   max-h-40 overflow-y-auto shadow z-50"
            >
              <li
                class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                (mousedown)="store.setMaxPrice(null); maxPriceOpen.set(false)"
              >
                No max
              </li>

              @for(price of store.priceOptions(); track $index) {
              <li
                class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                (mousedown)="store.setMaxPrice(price); maxPriceOpen.set(false)"
              >
                {{ price }}
              </li>
              }
            </ul>
            }
          </div>
        </div>

        <button
          class="text-sm underline text-indigo-500 hover:text-indigo-400"
          (click)="applyPriceRange()"
        >
          Apply
        </button>
      </div>
      }
    </div>
  `,
})
export class Filters {

  store=inject(HousesStore)
  down = ArrowDown;
  cdown = ChevronDown;
  minDropdownOpen = signal(false);
  maxDropdownOpen = signal(false);

  // To allow input blur without closing before click
  closeMinDropdown() {
    setTimeout(() => this.minDropdownOpen.set(false), 150);
  }
  closeMaxDropdown() {
    setTimeout(() => this.maxDropdownOpen.set(false), 150);
  }

  applyPriceRange() {
    // set the searchPrice in the store
    this.store.setSearchPrice(this.store.minPrice(), this.store.maxPrice());

    // fetch houses AFTER setting the search price
    this.store.getHouses();

    // close dropdowns
    this.closeAll();
  }

  priceOpen = signal(false);
  minPriceOpen = signal(false);
  maxPriceOpen = signal(false);

  closeAll() {
    this.priceOpen.set(false);
    this.minPriceOpen.set(false);
    this.maxPriceOpen.set(false);
  }

  toggleMinDropdown() {
    this.minPriceOpen.set(!this.minPriceOpen());
    if (this.minPriceOpen()) {
      this.maxPriceOpen.set(false); // close max if min opens
    }
  }

  toggleMaxDropdown() {
    this.maxPriceOpen.set(!this.maxPriceOpen());
    if (this.maxPriceOpen()) {
      this.minPriceOpen.set(false); // close min if max opens
    }
  }
}
