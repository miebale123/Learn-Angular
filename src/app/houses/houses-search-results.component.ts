import { Component, inject } from '@angular/core';
import { HousesStore } from './houses.store';
import { BookmarkStore } from './bookmarks.store';
import { Router } from '@angular/router';
import { Search } from './search.component';
import { Filters } from './filters.component';
import { ListMap } from './list-map.component';
import { Houses } from './houses.component';

@Component({
  selector: 'houses-search-results',
  imports: [Search, Filters, ListMap, Houses],
  template: `
    <!-- Container -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-around gap-6  p-2">
      <search-house (search)="onSearch($event)" [trySuggestion]="true"></search-house>

      <filters></filters>

      <div class="flex items-center justify-center md:justify-start">
        <list-map></list-map>
      </div>
    </div>

    <!-- Results Title -->
    @if (store.searchLocation()) {
    <h2 class=" text-lg md:text-2xl font-semibold text-center md:text-left">
      {{ store.searchLocation() + ' ' + store.property_type() + 's ' + store.type() }}
    </h2>

    }

    <div class="flex gap-2 items-center">
      <h3 class="text-sm md:text-base text-center md:text-left">
        {{ store.houses().length + ' homes' }}
      </h3>

      <div class="flex items-center gap-2">
        <label class="text-gray-700 text-sm">Sort by</label>

        <select
          class="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option>Relevant listings</option>
          <option>Newest listings</option>
          <option>Lowest price</option>
          <option>Highest price</option>
          <option>Year built</option>
          <option>Open house date</option>
          <option>Recently reduced</option>
          <option>Largest sqft</option>
          <option>Lot size</option>
          <option>Photo count</option>
        </select>
      </div>
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
