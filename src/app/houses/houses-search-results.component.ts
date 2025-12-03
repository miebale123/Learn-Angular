import { Component, inject } from '@angular/core';
import { HousesStore } from './houses.store';
import { BookmarkStore } from './bookmarks.store';
import { Router } from '@angular/router';
import { Search } from './search.component';
import { Filters } from './filters.component';
import { Houses } from './houses.component';

@Component({
  selector: 'houses-search-results',
  imports: [Search, Filters, Houses],
  template: `
    <!-- Container -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6  p-4">
      <div class="flex gap-2 items-center ">
        <search-house />

        <filters></filters>
      </div>
    </div>

    <div class="flex items-center  justify-between ">
      <!-- Results Title -->
      <h2 class=" text-lg md:text-2xl font-semibold  text-left px-4 py-2">
        @if(store.searchedLocationDisplay()){
        {{ store.searchedLocationDisplay() + ' ' + store.property_type() + 's ' + store.type() }}

        }
      </h2>

      <a class="font-bold underline mr-20">how much home can I afford?</a>
    </div>

    <div class="flex gap-4 items-center px-8 font-semibold">
      <h3 class="text-sm md:text-base  md:text-left">
        {{ store.houses().length + ' homes' }}
      </h3>

      <span class="text-gray-700 text-sm">Sort by</span>

      <span>popular filters</span>

      <button class="border border-gray-200 bg-white shadow-lg p-2 hover:bg-gray-100">
        Min $100k
      </button>
      <button class="border border-gray-200  bg-white shadow-lg p-2 hover:bg-gray-100">
        Hide Land
      </button>
      <button class="border border-gray-200  bg-white shadow-lg p-2 hover:bg-gray-100">
        New Construction
      </button>
    </div>

    <houses></houses>
  `,
})
export class HousesSearchResults {
  store = inject(HousesStore);
  bookmarks = inject(BookmarkStore);

  router = inject(Router);

  async ngOnInit() {
    await this.store.getHouses();
    this.store.showAd(true);
  }

  async onSearch(searchValue: string) {
    this.store.set('searchLocation', searchValue);
    await this.store.getHouses(); // filter in-place
  }
}
