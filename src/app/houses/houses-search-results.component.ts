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
