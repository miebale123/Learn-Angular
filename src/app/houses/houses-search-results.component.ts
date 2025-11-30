import { Component, inject } from '@angular/core';
import { HousesStore } from './houses.store';
import { BookmarkStore } from './bookmarks.store';
import { Router } from '@angular/router';
import { Search } from './search.component';
import { Filters } from './filters.component';
import { ListMap } from './list-map.component';
import { Houses } from './houses.component';
import { TrySearchSuggestions } from './try-search-suggestion.component';

@Component({
  selector: 'houses-search-results',
  imports: [Search, Filters, ListMap, Houses],
  template: `
    <div class="flex gap-2 items-center justify-around p-16">
      <search-house (search)="onSearch($event)" [trySuggestion]="true"></search-house>

      <filters />
      <div class="flex items-center">
        <list-map />
      </div>
    </div>

    @if(store.searchLocation()){
    <h2 class=" mt-4">
      {{ store.searchLocation() + ' ' + store.property_type() + 's' + ' ' + store.type() }}
    </h2>
    <h3>{{ store.houses().length + 'homes' }}</h3>
    }

    <houses />
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
