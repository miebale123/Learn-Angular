import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';
import { AuthStateService } from '../core/auth/auth-state.service';
import { jwtDecode } from 'jwt-decode';

export const HOUSE_TYPES = ['for sale', 'for rent'] as const;
export type HouseType = (typeof HOUSE_TYPES)[number];

export const PROPERTY_TYPES = ['condo', 'house', 'land'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

interface HouseDto {
  id: string;
  type: HouseType;
  property_type: PropertyType;
  secure_url: string;
  location: string;
  previousPrice?: number;
  priceReduced?: boolean;
  price: number;
  bedroom: number;
  bathroom: number;
  area: string;
  userId: number;
}

export const HousesStore = signalStore(
  { providedIn: 'root' },

  withState<{
    type: HouseType;
    property_type: PropertyType;
    location: string;
    price: number;
    bedroom: number;
    bathroom: number;
    area: string;
    searchLocation: string;
    searchPrice: { min: number | null; max: number | null };
    file: File | null;
    houses: HouseDto[];
    bookmarks: {
      id: string;
      house: HouseDto;
      user: { id: number; email: string };
    }[];
    notifications: {
      id: string;
      type: HouseType;
      house: HouseDto;
      user: { id: number };
    }[];
  }>({
    type: 'for rent',
    property_type: 'house',
    location: '',
    price: 0,
    bedroom: 0,
    bathroom: 0,
    area: '',
    searchLocation: '',
    searchPrice: { min: null, max: null },
    file: null,
    houses: [],
    bookmarks: [],
    notifications: [],
  }),

  withMethods((store) => {
    const http = inject(HttpClient);
    const auth = inject(AuthStateService);

    const myHouses = computed(() => {
      const token = auth.accessToken();
      if (!token) return [];
      const userId = jwtDecode<{ sub: number }>(token).sub;
      return store.houses().filter((h) => h.userId === userId);
    });

    const filteredHouses = computed(() => {
      let list = store.houses();

      if (store.searchLocation()) {
        list = list.filter((h) =>
          h.location.toLowerCase().includes(store.searchLocation().toLowerCase())
        );
      }

      const min = store.searchPrice().min;
      const max = store.searchPrice().max;

      if (min !== null) list = list.filter((h) => h.price >= min);
      if (max !== null) list = list.filter((h) => h.price <= max);

      return list;
    });

    return {
      myHouses,
      filteredHouses,

      setSearchLocation(searchLocation: string) {
        patchState(store, { searchLocation });
      },

      setSearchPrice(min: number | null, max: number | null) {
        patchState(store, { searchPrice: { min, max } });
      },

      setType(type: HouseType) {
        patchState(store, { type });
      },

      setPropertyType(property_type: PropertyType) {
        patchState(store, { property_type });
      },

      setFile(file: File) {
        patchState(store, { file });
      },

      setLocation(location: string) {
        patchState(store, { location });
      },

      setPrice(price: number) {
        patchState(store, { price });
      },

      setBathroom(bathroom: number) {
        patchState(store, { bathroom });
      },

      setBedroom(bedroom: number) {
        patchState(store, { bedroom });
      },

      setArea(area: string) {
        patchState(store, { area });
      },

      async uploadHouse() {
        if (!store.file() || !store.location()) return;

        const formData = new FormData();
        formData.append('type', store.type());
        formData.append('property_type', store.property_type());
        formData.append('file', store.file()!);
        formData.append('location', store.location());
        formData.append('bedroom', String(store.bedroom()));
        formData.append('bathroom', String(store.bathroom()));
        formData.append('price', String(store.price()));
        formData.append('area', String(store.area()));

        const res: any = await firstValueFrom(
          http.post(`${environment.apiBaseUrl}/houses/upload-house`, formData)
        );

        patchState(store, {
          houses: [...store.houses(), res.savedHouse],
          file: null,
          location: '',
        });
      },

      async getHouses() {
        const res: any = await firstValueFrom(http.get(`${environment.apiBaseUrl}/houses`));
        patchState(store, { houses: res });
      },

      async getBookmarks() {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/bookmarks`)
        );
        patchState(store, { bookmarks: res });
      },

      async getNotifications() {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/notifications`)
        );
        patchState(store, { notifications: res });
      },

      async updateHouse(
        id: string,
        location: string,
        price: number,
        bedroom: number,
        bathroom: number,
        area: string
      ) {
        const res: any = await firstValueFrom(
          http.patch(`${environment.apiBaseUrl}/houses/${id}`, {
            location,
            price,
            bedroom,
            bathroom,
            area,
          })
        );

        const updated = res.updatedHouse;

        // update houses list
        patchState(store, {
          houses: store.houses().map((h) => (h.id === id ? updated : h)),
          // update bookmarks that reference this house
          bookmarks: store
            .bookmarks()
            .map((b) => (b.house.id === id ? { ...b, house: updated } : b)),
          // update notifications that reference this house
          notifications: store
            .notifications()
            .map((n) => (n.house.id === id ? { ...n, house: updated } : n)),
        });
      },

      async deleteHouse(id: string) {
        await firstValueFrom(http.delete(`${environment.apiBaseUrl}/houses/deleteHouse/${id}`));
        patchState(store, {
          houses: store.houses().filter((h) => h.id !== id),
          bookmarks: store.bookmarks().filter((b) => b.house.id !== id),
        });
      },

      async deleteBookmark(id: string) {
        await firstValueFrom(http.delete(`${environment.apiBaseUrl}/houses/deleteBookmark/${id}`));
        patchState(store, { bookmarks: store.bookmarks().filter((b) => b.id !== id) });
      },

      async createBookmark(houseId: string) {
        const res: any = await firstValueFrom(
          http.post(`${environment.apiBaseUrl}/houses/create-bookmark`, { houseId })
        );
        patchState(store, {
          bookmarks: [...store.bookmarks(), res.savedBookmark],
        });
      },
    };
  })
);
