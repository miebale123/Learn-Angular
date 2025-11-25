import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { AuthStateService } from '../pages/auth-sign-in/sign-in.component';

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
    searchLocation: string | null;
    file: File | null;
    house: HouseDto | null;
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
    searchPrice: { min: number | null; max: number | null };
    searchBedroom: { min: number | null; max: number | null };
    searchBathroom: { min: number | null; max: number | null };

    priceOptions: number[];
    minPrice: number | null;
    maxPrice: number | null;
    minBedroom: number | null;
    maxBedroom: number | null;
    minBathroom: number | null;
    maxBathroom: number | null;

    uploading: boolean;
    notificationCounter: number;
  }>({
    type: 'for rent',
    property_type: 'house',
    location: '',
    price: 0,
    bedroom: 0,
    bathroom: 0,
    area: '',

    file: null,
    house: null,
    houses: [],
    bookmarks: [],
    notifications: [],
    searchLocation: null,
    searchPrice: { min: null, max: null },
    searchBedroom: { min: null, max: null },
    searchBathroom: { min: null, max: null },
    priceOptions: [50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000],
    minPrice: null,
    maxPrice: null,
    minBedroom: null,
    maxBedroom: null,
    minBathroom: null,
    maxBathroom: null,
    uploading: false,
    notificationCounter: 0,
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

    return {
      myHouses,

      incrementNCounter() {
        patchState(store, { notificationCounter: store.notificationCounter() + 1 });
      },

      resetNCounter() {
        patchState(store, { notificationCounter: 0 });
      },

      setMinBedroom(value: number | null) {
        patchState(store, { minBedroom: value });
      },

      setMaxBedroom(value: number | null) {
        patchState(store, { maxBedroom: value });
      },

      setMinBathroom(value: number | null) {
        patchState(store, { minBathroom: value });
      },

      setMaxBathroom(value: number | null) {
        patchState(store, { maxBathroom: value });
      },

      // setters
      setMinPrice(value: number | null) {
        patchState(store, { minPrice: value });
      },
      setMaxPrice(value: number | null) {
        patchState(store, { maxPrice: value });
      },

      // apply search
      setSearchPrice(min: number | null, max: number | null) {
        patchState(store, { searchPrice: { min, max } });
      },
      setSearchBedroom(min: number | null, max: number | null) {
        patchState(store, { searchBedroom: { min, max } });
      },

      setSearchBathroom(min: number | null, max: number | null) {
        patchState(store, { searchBathroom: { min, max } });
      },

      setSearchLocation(searchLocation: string | null) {
        patchState(store, { searchLocation });
      },

      resetSearchLocation() {
        patchState(store, { searchLocation: null });
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
        console.log('hey uploading');
        patchState(store, { uploading: true });
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
          price: 0,
          bedroom: 0,
          bathroom: 0,
          area: '',
          uploading: false,
        });
      },

      async getHouses() {
        const query = new URLSearchParams();

        // Price range
        const { min: priceMin, max: priceMax } = store.searchPrice();
        if (priceMin !== null) query.set('min', String(priceMin));
        if (priceMax !== null) query.set('max', String(priceMax));

        // Location, type, property_type
        if (store.searchLocation()) query.set('location', store.searchLocation()!);
        if (store.property_type()) query.set('property_type', store.property_type());
        if (store.type()) query.set('type', store.type());

        // Bedroom range
        const { min: bedroomMin, max: bedroomMax } = store.searchBedroom();
        if (bedroomMin !== null) query.set('bedroomMin', String(bedroomMin));
        if (bedroomMax !== null) query.set('bedroomMax', String(bedroomMax));

        // Bathroom range
        const { min: bathroomMin, max: bathroomMax } = store.searchBathroom();
        if (bathroomMin !== null) query.set('bathroomMin', String(bathroomMin));
        if (bathroomMax !== null) query.set('bathroomMax', String(bathroomMax));

        // Build URL after all params
        const url = `${environment.apiBaseUrl}/houses?${query.toString()}`;

        const res: any = await firstValueFrom(http.get(url));

        patchState(store, { houses: res });
      },

      async getHouse(id: string) {
        const res: any = await firstValueFrom(http.get(`${environment.apiBaseUrl}/houses/${id}`));

        patchState(store, { house: res });
      },

      async getBookmarks() {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/bookmarks`)
        );
        patchState(store, { bookmarks: res });
      },

      async getNotifications() {
        const notifs: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/notifications`)
        );

        // Map backend Notification[] to your expected shape
        const mapped = notifs.map((n: any) => ({
          id: n.id,
          type: n.type as HouseType,
          house: {
            id: n.house.id,
            type: n.house.type,
            property_type: n.house.property_type,
            secure_url: n.house.secure_url,
            location: n.house.location,
            previousPrice: n.house.previousPrice,
            priceReduced: n.house.priceReduced,
            price: n.house.price,
            bedroom: n.house.bedroom,
            bathroom: n.house.bathroom,
            area: n.house.area,
            userId: n.house.userId,
          },
          user: { id: n.user.id },
        }));

        patchState(store, {
          notifications: mapped,
          notificationCounter: mapped.length, // always the correct count
        });
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

        // 🔥 <— ADD THIS
        if (updated.priceReduced) {
          patchState(store, {
            notificationCounter: store.notificationCounter() + 1,
          });
        }
      },

      async deleteHouse(id: string) {
        await firstValueFrom(http.delete(`${environment.apiBaseUrl}/houses/deleteHouse/${id}`));
        patchState(store, {
          houses: store.houses().filter((h) => h.id !== id),
          bookmarks: store.bookmarks().filter((b) => b.house.id !== id),
        });
      },

      async deleteNotification(id: string) {
        await firstValueFrom(
          http.delete(`${environment.apiBaseUrl}/houses/deleteNotification/${id}`)
        );
        patchState(store, { notifications: store.notifications().filter((n) => n.id !== id) });
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
