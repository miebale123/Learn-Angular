import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HousesStore } from './houses/houses.store';

@Component({
  selector: 'upload-broker-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (uploadedMessage()) {
    <div class="mt-4 p-3 bg-green-100 text-green-700 text-center rounded-xl font-semibold">
      Successfully uploaded broker info
    </div>
    }

    <div class="max-w-2xl w-full p-8 rounded-2xl shadow-lg bg-white">
      <h2 class="text-3xl font-bold mb-8">Upload Broker Info</h2>

      <div class="mb-8">
        @if (!imageLocked()) {
        <label class="block cursor-pointer">
          <input type="file" accept="image/*" (change)="onFileSelected($event)" class="hidden" />

          <p class="font-medium mb-3">Upload your official broker certification.</p>

          <div
            class="
                border-2 border-dashed border-gray-300 rounded-xl p-10 text-center
                hover:border-blue-500 transition
              "
          >
            @if (!uploadedPreview()) {
            <div>
              <svg
                class="w-12 h-12 mx-auto mb-4 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <p class="text-gray-600 font-semibold">Click to upload image</p>
            </div>
            }
          </div>
        </label>
        } @if (uploadedPreview()) {
        <div class="relative inline-block mt-6">
          <img
            [src]="uploadedPreview()"
            alt="Preview"
            class="w-full max-w-sm h-64 object-cover rounded-xl shadow-lg"
          />

          <button
            (click)="do()"
            class="
                absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full
                hover:bg-red-600 transition
              "
          >
            ✕
          </button>
        </div>
        }
      </div>

      <!-- Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label class="font-medium block mb-1">enter broker company name</label>
          <input
            type="text"
            [(ngModel)]="store.brokerUsername"
            placeholder="please enter Proper broker username"
            class="
              w-full px-6 py-3 rounded-xl border border-gray-700
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none
              text-gray-400
            "
          />
        </div>

        <div>
          <label class="font-medium block mb-1">Location</label>
          <input
            type="text"
            [(ngModel)]="store.brokerLocation"
            placeholder="enter City / Area"
            class="
              w-full px-4 py-3 rounded-xl border border-gray-300
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none
              text-gray-400

            "
          />
        </div>
      </div>

      <!-- Upload Button -->
      <button
        (click)="upload()"
        [disabled]="uploading()"
        class="
          w-full py-4 rounded-xl font-semibold text-white transition
          {{
          store.uploading()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
        }}
        "
      >
        {{ store.uploading() ? 'Uploading...' : 'Upload Broker Info' }}
      </button>
    </div>
  `,
})
export class UploadBrokerInfo {
  store = inject(HousesStore);
  uploadedPreview = signal<string | null>(null);

  uploading = signal(false);
  imageLocked = signal(false);
  uploadedMessage = signal(false);

  do() {
    this.uploadedPreview.set(null);
    this.imageLocked.set(false);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.store.set('file', file);
    this.imageLocked.set(true);
    const reader = new FileReader();
    reader.onload = (e) => this.uploadedPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  async upload() {
    this.uploading.set(true);
    await this.store.uploadBrokerInfo();
    this.uploadedPreview.set(null);
    this.uploadedMessage.set(true);

    setTimeout(() => this.uploadedMessage.set(false), 2500);
  }
}
