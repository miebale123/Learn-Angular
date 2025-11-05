import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthStateService } from '../core/auth/auth-state.service';
import { environment } from '../../environments/environments';

export interface HouseDto {
  id: number;
  secure_url: string;
  price: string;
  location: string;
}

export const HousesStore = signalStore(
  { providedIn: 'root' },

  withState<{ houses: HouseDto[]; bookmarks: HouseDto[] }>({
    houses: [],
    bookmarks: [],
  }),

  withMethods((store) => {
    const http = inject(HttpClient);
    const authState = inject(AuthStateService);

    return {
      async loadAll() {
        const res: any = await firstValueFrom(http.get(`${environment.apiBaseUrl}/houses`));
        console.log('houses are: ', res);
        patchState(store, { houses: res });
      },

      async loadBookmarks() {
        const res: any = await firstValueFrom(http.get(`${environment.apiBaseUrl}/bookmarks `));
        console.log(res);
        patchState(store, { bookmarks: res });
      },

      /** Add a house to bookmarks */
      async findHouse(id: number) {
        let houses = store.houses();
        if (!houses.length) {
          await this.loadAll();
          houses = store.houses();
        }

        const house = houses.find((h) => h.id === id);

        console.log('the house to be bookmarked is: ', house);
        if (!house) return;

        const alreadyBookmarked = store.bookmarks().some((b) => b.id === id);
        if (alreadyBookmarked) return;

        const res: any = await firstValueFrom(
          http.post(`${environment.apiBaseUrl}/bookmarks/create-bookmark`, house)
        );

        console.log('Adds to bookmarks:', res);
        patchState(store, { bookmarks: [...store.bookmarks(), res] });

        console.log('Current bookmarks:', store.bookmarks());
      },
    };
  })
);

// export const TestStore = signalStore(
//   withState({}),
//   withMethods(() => {
//     return {};
//   })
// );
