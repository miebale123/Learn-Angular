import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';
import { io } from 'socket.io-client';

@Component({
  selector: 'upload-house',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6 bg-black rounded-2xl shadow-lg mt-10">
      <h1 class="text-2xl font-bold  mb-6 text-center">Upload Your House</h1>

      <div class="flex flex-col space-y-4">
        <!-- File Upload -->
        <label
          class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:border-blue-500 transition"
        >
          <span class="text-gray-500 mb-2">Click to select an image</span>
          <input type="file" (change)="onFileSelected($event)" class="hidden" />
          <span *ngIf="file" class="text-green-600 font-medium">{{ file.name }}</span>
        </label>

        <!-- Location -->
        <input
          type="text"
          [(ngModel)]="location"
          placeholder="Location"
          class="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <!-- Price -->
        <input
          type="text"
          [(ngModel)]="price"
          placeholder="Price"
          class="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <!-- Upload Button -->
        <button
          (click)="uploadHouse()"
          class="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
        >
          Upload House
        </button>

        @if (notifications.length) {

        <div class="bg-gray-800 text-black p-3 rounded-xl">
          <h2 class="text-lg font-semibold mb-2">Notifications</h2>
          <ul>
            @for (n of notifications; track $index) {
            <li class="bg-gray-700 p-2 rounded mb-1">
              {{ n.message }}
            </li>
            }
          </ul>
        </div>
        }
      </div>
    </div>
  `,
})
export class UploadHouse {
  private http = inject(HttpClient);
  private socket = io(`${environment.apiBaseUrl}/notifications`);

  file: File | null = null;
  price = '';
  location = '';
  notifications: any[] = [];

  constructor() {
    this.socket.on('notification', (data: any) => {
      this.notifications.unshift(data);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.file = input.files[0];
  }

  async uploadHouse(): Promise<void> {
    if (!this.file) return;

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('price', this.price);
    formData.append('location', this.location);

    try {
      const res: any = await firstValueFrom(
        this.http.post(`${environment.apiBaseUrl}/houses/upload-house`, formData)
      );
      console.log('Uploaded:', res);

      // Clear form
      this.file = null;
      this.price = '';
      this.location = '';
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }
}
