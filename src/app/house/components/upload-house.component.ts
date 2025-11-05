import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'upload-house',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-3 max-w-md mx-auto p-4">
      <input type="file" (change)="onFileSelected($event)" class="border p-2 rounded" />

      <!-- new text fields -->
      <input type="text" [(ngModel)]="location" placeholder="Location" class="border p-2 rounded" />
      <input [(ngModel)]="price" placeholder="price" class="border p-2 rounded" />

      <button
        (click)="uploadHouse()"
        class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
      >
        Upload
      </button>
    </div>
  `,
})
export class UploadHouse {
  private http = inject(HttpClient);

  file: File | null = null;
  price = '';
  location = '';

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
        this.http.post(`${environment.apiBaseUrl}/houses/create-house`, formData)
      );
      console.log('Uploaded:', res);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }
}
