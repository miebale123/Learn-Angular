import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HousesStore } from './houses.store';

@Component({
  selector: 'upload-house',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (uploadedMessage()) {
    <p class="mt-4 text-green-600 font-semibold">Uploaded.</p>
    }

    <div class="max-w-2xl mx-auto p-6 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold mb-6">Upload Property</h2>

      <!-- Image Upload -->
      <div class="mb-6">
        @if(!imageLocked()){
        <label class="block cursor-pointer">
          <input type="file" accept="image/*" (change)="onFileSelected($event)" class="hidden" />
          <div
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition"
          >
            @if (!uploadedPreview()) {
            <div class="">
              <svg
                class="w-12 h-12 mx-auto mb-3"
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
              <p class="font-medium">Click to upload image</p>
            </div>
            }
          </div>
        </label>

        } @if (uploadedPreview()) {
        <div class="mt-4 relative inline-block">
          <img
            [src]="uploadedPreview()"
            alt="Preview"
            class="w-full max-w-sm h-64 object-cover rounded-xl shadow-md"
          />
          <button
            (click)="do()"
            class="absolute top-2 right-2 bg-red-500  p-2 rounded-full hover:bg-red-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        }
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <label>location:</label>
        <input
          type="text"
          [(ngModel)]="store.location"
          placeholder="Location"
          class="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        <label>price:</label>
        <input
          type="text"
          [(ngModel)]="store.price"
          placeholder="Price"
          class="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        <label>bedrooms:</label>
        <input
          [(ngModel)]="store.bedroom"
          placeholder="Bedrooms"
          class="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        <label>bathrooms:</label>

        <input
          [(ngModel)]="store.bathroom"
          placeholder="Bathrooms"
          class="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        <label>area:</label>
        <input
          [(ngModel)]="store.area"
          placeholder="Area (sqft)"
          class="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <button
        (click)="upload()"
        [disabled]="uploading()"
        class="w-full py-4 rounded-xl font-semibold  transition
                     {{
          store.uploading()
            ? 'bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
        }}"
      >
        {{ store.uploading() ? 'Uploading...' : 'Upload Property' }}
      </button>
    </div>
  `,
})
export class Upload {
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
    await this.store.uploadHouse();
    this.uploadedPreview.set(null);
    this.uploadedMessage.set(true);
  }
}
