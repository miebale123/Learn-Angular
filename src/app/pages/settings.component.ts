import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HousesStore } from '../houses/houses.store';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()">
      <input
        type="text"
        class="flex-1 text-gray-900 placeholder-gray-400 focus:outline-none border-none p-3 px-8 text-xl"
        [ngModel]="store.brokerLocation()"
        (ngModelChange)="store.setBrokerLocation($event)"
        name="location"
        placeholder="Enter your location"
      />
      <button
        type="submit"
        class="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  `,
})
export class Settings {
  store = inject(HousesStore);

  submit() {
    // Call a store method to send the location to the backend
    this.store.updateBrokerLocation();
  }
}
