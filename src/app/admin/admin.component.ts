import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousesStore } from '../houses/houses.store';

@Component({
  selector: 'admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-8 max-w-6xl mx-auto">

      <h1 class="text-3xl font-bold mb-8 text-center">
      Pending Broker Verification
      </h1>

      @if (store.pendingBrokers().length === 0) {
        <p class="text-center py-6 text-lg">Loading brokers...</p>
      } @else {

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          @for (broker of store.pendingBrokers(); track $index) {

            <div class="border rounded-2xl p-4 shadow-lg space-y-4">

              <img
                [src]="broker.secure_url"
                class="w-32 h-32 object-cover rounded mx-auto cursor-pointer"
                (click)="selectedBroker.set(broker)"
              />

              <div class="space-y-1 text-center">
                <p class="font-semibold">{{ broker.location }}</p>
                <p class="text-sm text-gray-600">Broker ID: {{ broker.id }}</p>
              </div>

              <button
                (click)="activateBroker(broker.id)"
                class="w-full py-2 rounded bg-blue-500 text-white"
              >
                Approve Broker
              </button>

            </div>
          }

        </div>

        @if (selectedBroker()) {
          <div class="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div class="bg-white rounded-2xl p-4 max-w-lg">
              <img
                [src]="selectedBroker()!.secure_url"
                class="w-full h-auto rounded"
              />
              <button
                (click)="selectedBroker.set(null)"
                class="w-full mt-4 py-2 bg-gray-700 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        }

      }
    </section>
  `,
})
export class Admin {
  store = inject(HousesStore);
  selectedBroker = signal<any | null>(null);

  async ngOnInit() {
    await this.store.getPendingBrokers();
  }

  activateBroker(id: string) {
    this.store.activateBroker(id);
  }
}
