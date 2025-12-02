import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Typo, typoValue } from './typo.interface';
import { BookmarkStore } from './bookmarks.store';
import { PropertyType } from './house.dto';
import { AuthStateService } from '../auth/auth-state.service';

export const HousesStore = signalStore(
  { providedIn: 'root' },

  withState<Omit<Typo, 'bookmarks'>>(typoValue),

  withMethods((store) => {
    const http = inject(HttpClient);
    const auth = inject(AuthStateService);

    const myHouses = computed(() => {
      const token = auth.accessToken();
      if (!token) return [];
      const userId = jwtDecode<{ sub: number }>(token).sub;
      return store.houses().filter((h) => h.userId === userId);
    });

    const bookmarkStore = inject(BookmarkStore);

    const houseBookmarks = computed(() => {
      const myHouseIds = store.houses().map((h) => h.id);
      return bookmarkStore.bookmarks().filter((b) => myHouseIds.includes(b.house.id));
    });

    return {
      myHouses,
      houseBookmarks,

      showAuthModal(value: boolean) {
        patchState(store, { authModal: value });
      },

      showAd(value: boolean) {
        patchState(store, { ad: value });
      },

      async getPendingHouses() {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/pendingHouses`)
        );

        patchState(store, { pendingHouses: res });
      },

      async approveHouse(id: string) {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/pendingHouses/${id}/approve`)
        );

        const approved = res.approvedHouse; // FIXED

        const pbs = store.pendingHouses().filter((ph) => ph.id !== id);

        const exists = store.houses().some((h) => h.id === id);

        patchState(store, {
          pendingHouses: pbs,
          houses: exists
            ? store.houses().map((h) => (h.id === id ? approved : h))
            : [...store.houses(), approved],
        });
      },

      async activateBroker(id: string) {
        const res: any = await firstValueFrom(
          http.patch(`${environment.apiBaseUrl}/admin-page/pendingBrokers/${id}/approve`, {})
        );

        const existing = store.pendingBrokers().find((pb) => pb.id === id);

        if (!existing) {
          console.log('broker in front end not found');
          return;
        }

        existing.status = 'active';

        const pbs = store.pendingBrokers().filter((pb) => pb.id !== id);

        patchState(store, { pendingBrokers: pbs });
      },

      async getPendingBrokers() {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/admin-page/brokers`)
        );

        patchState(store, { pendingBrokers: res });
        console.log('pending brokers: ', store.pendingBrokers());
      },

      async updateBrokerLocation() {
        const location = store.brokerLocation();
        if (!location) return;

        const res: any = await firstValueFrom(
          http.patch(`${environment.apiBaseUrl}/user_profile/location`, { location })
        );
        patchState(store, { brokerLocation: location });
      },

      async uploadHouse() {
        if (!store.file() || !store.location()) return;

        patchState(store, { uploading: true });

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

        const newHouse = {
          ...res.savedHouse,
          assignedBrokerCompanyName: res.savedHouse.assignedBroker?.brokerCompanyName ?? null,
        };

        patchState(store, {
          houses: [...store.houses(), newHouse],
          file: null,
          location: '',
          price: 0,
          bedroom: 0,
          bathroom: 0,
          area: '',
          uploading: false,
        });
      },

      async uploadBrokerInfo() {
        if (!store.file() || !store.brokerUsername() || !store.brokerLocation()) return;

        patchState(store, { uploading: true });

        const formData = new FormData();
        formData.append('file', store.file()!);
        formData.append('brokerCompanyName', store.brokerUsername()!);
        formData.append('location', store.brokerLocation()!);

        const res: any = await firstValueFrom(
          http.post(`${environment.apiBaseUrl}/houses/upload-broker-info`, formData)
        );

        patchState(store, {
          brokers: [...store.brokers(), res.savedBroker],
          file: null,
          brokerUsername: '',
          brokerLocation: '',
          uploading: false,
        });
      },

      async getHouses() {
        const query = new URLSearchParams();

        const { min: priceMin, max: priceMax } = store.searchPrice();
        if (priceMin !== null) query.set('min', String(priceMin));
        if (priceMax !== null) query.set('max', String(priceMax));

        if (store.searchLocation()) query.set('location', store.searchLocation()!);
        if (store.property_type()) query.set('property_type', store.property_type());
        if (store.type()) query.set('type', store.type());

        const { min: bedroomMin, max: bedroomMax } = store.searchBedroom();
        if (bedroomMin !== null) query.set('bedroomMin', String(bedroomMin));
        if (bedroomMax !== null) query.set('bedroomMax', String(bedroomMax));

        const { min: bathroomMin, max: bathroomMax } = store.searchBathroom();
        if (bathroomMin !== null) query.set('bathroomMin', String(bathroomMin));
        if (bathroomMax !== null) query.set('bathroomMax', String(bathroomMax));

        const qs = query.toString();
        const url = qs
          ? `${environment.apiBaseUrl}/houses?${qs}`
          : `${environment.apiBaseUrl}/houses`;

        const res: any = await firstValueFrom(http.get(url));

        patchState(store, { searchedLocationDisplay: store.searchLocation() });
        patchState(store, { houses: res });
      },

      async getHouse(id: string) {
        const res: any = await firstValueFrom(http.get(`${environment.apiBaseUrl}/houses/${id}`));

        patchState(store, { house: res });
      },

      async getNotifications() {
        const res: any = await firstValueFrom(
          http.get(`${environment.apiBaseUrl}/houses/notifications`)
        );

        const notifications = res.map((n: any) => ({
          id: n.id,
          type: n.type,
          house: { ...n.house },
          user: { id: n.user.id },
        }));

        patchState(store, {
          notifications,
          notificationCounter: notifications.length,
        });
      },

      async deleteHouse(id: string) {
        await firstValueFrom(http.delete(`${environment.apiBaseUrl}/houses/deleteHouse/${id}`));
        patchState(store, {
          houses: store.houses().filter((h) => h.id !== id),
        });
      },

      async deleteNotification(id: string) {
        await firstValueFrom(
          http.delete(`${environment.apiBaseUrl}/houses/deleteNotification/${id}`)
        );
        patchState(store, { notifications: store.notifications().filter((n) => n.id !== id) });
      },

      setBrokerLocation(brokerLocation: string | null) {
        patchState(store, { brokerLocation });
      },

      incrementNCounter() {
        patchState(store, { notificationCounter: store.notificationCounter() + 1 });
      },

      resetNCounter() {
        patchState(store, { notificationCounter: 0 });
      },

      setSearchPrice(min: number | null, max: number | null) {
        patchState(store, { searchPrice: { min, max } });
      },

      setSearchBedroom(min: number | null, max: number | null) {
        patchState(store, { searchBedroom: { min, max } });
      },

      setPropertyType(property_type: PropertyType) {
        patchState(store, { property_type: property_type });
      },

      setSearchBathroom(min: number | null, max: number | null) {
        patchState(store, { searchBathroom: { min, max } });
      },

      set<K extends keyof Omit<Typo, 'bookmarks'>>(key: K, value: Omit<Typo, 'bookmarks'>[K]) {
        patchState(store, { [key]: value } as any);
      },
    };
  })
);
