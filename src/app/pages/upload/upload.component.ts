import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule
import { firstValueFrom } from 'rxjs';
import { FetchBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'upload',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- include FormsModule here
  template: `
    <div class="p-6 max-w-md mx-auto border border-gray-300 rounded-2xl shadow-sm space-y-4">
      <h2 class="text-xl font-semibold mb-2">Upload House Details</h2>

      <div class="flex flex-col space-y-3">
        <input type="file" (change)="onFileSelected($event)" class="border p-2 rounded" />
        <input type="number" placeholder="Price" [(ngModel)]="price" class="border p-2 rounded" />
        <input
          type="text"
          placeholder="Location"
          [(ngModel)]="location"
          class="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          [(ngModel)]="description"
          class="border p-2 rounded h-24"
        ></textarea>

        <button
          (click)="uploadHouse()"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        >
          Upload
        </button>

        @if (uploadResult()) {
        <div class="mt-3 text-green-600 text-sm">Uploaded: {{ uploadResult()?.message }}</div>
        }
      </div>
    </div>
  `,
})
export class Upload {
  private http = inject(HttpClient);

  file: File | null = null;
  price = '';
  description = '';
  location = '';
  uploadResult = signal<{ message: string; filename: string; url: string } | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.file = input.files[0];
  }

  async uploadHouse(): Promise<void> {
    if (!this.file || !this.price || !this.description || !this.location) {
      alert('Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('price', this.price);
    formData.append('description', this.description);
    formData.append('location', this.location);

    try {
      const res: any = await firstValueFrom(
        this.http.post('http://localhost:4442/upload', formData)
      );

      this.uploadResult.set(res);
      console.log('Uploaded:', res);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }
}
