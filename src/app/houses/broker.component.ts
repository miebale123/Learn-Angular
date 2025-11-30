import { Component, inject } from '@angular/core';
import { HousesStore } from './houses.store';

@Component({
  selector: 'broker',
  standalone: true,
  template: `
    <section class="p-6 max-w-5xl mx-auto">

      <h1 class="text-2xl font-semibold mb-4">
        Pending Houses Assigned to You
      </h1>

      @if (store.pendingHouses().length === 0) {
        <p>No pending houses assigned to you.</p>
      } @else {

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          @for (h of store.pendingHouses(); track $index) {

            <div class="border p-4 rounded-2xl shadow space-y-2">

              <img
                [src]="h.secure_url"
                class="w-full h-40 object-cover rounded"
              />

              <p class="font-semibold">{{ h.location }}</p>
              <p class="text-sm">Bedrooms: {{ h.bedroom }}</p>
              <p class="text-sm">Bathrooms: {{ h.bathroom }}</p>

              <button
                (click)="approve(h.id)"
                class="w-full py-2 rounded bg-green-600 text-white"
              >
                Approve
              </button>

            </div>

          }
        </div>

      }

    </section>
  `,
})
export class Broker {
  store = inject(HousesStore);

  async ngOnInit() {
    await this.store.getPendingHouses();
  }

  approve(houseId: string) {
    this.store.approveHouse(houseId);
  }
}


