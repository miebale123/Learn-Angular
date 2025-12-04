import { Component, inject } from '@angular/core';
import { HousesStore } from './houses.store';
import { BookmarkStore } from './bookmarks.store';
import { Router } from '@angular/router';
import { Search } from './search.component';
import { Filters } from './filters.component';
import { Houses } from './houses.component';
import { SortBy } from './sort-by.component';

@Component({
  selector: 'houses-search-results',
  imports: [Search, Filters, Houses, SortBy],
  template: `
    <!-- Container -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6  p-4">
      <div class="flex gap-2 items-center ">
        <search-house (search)="onSearch($event)" [trySuggestion]="true"></search-house>

        <filters></filters>

        <div>
          <div class="flex gap-4 items-center px-8 font-semibold">
            <h3 class="text-sm md:text-base  md:text-left">
              {{ store.houses().length + ' homes' }}
            </h3>

            <sort-by />

            <span>popular filters</span>

            <button class="border border-gray-200 bg-white shadow-lg p-2 hover:bg-gray-100">
              Min $100k
            </button>
          </div>
        </div>
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
  }

  async onSearch(searchValue: string) {
    this.store.set('searchLocation', searchValue);
    await this.store.getHouses(); // filter in-place
  }
}
