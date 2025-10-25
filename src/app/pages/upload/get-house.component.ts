import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface House {
  filename: string;
  url: string;
  meta: {
    price: string;
    description: string;
    location: string;
  };
}

@Component({
  selector: 'get-house',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-3xl mx-auto p-4 space-y-6">
      @if (houses().length === 0) {
      <p class="text-gray-500">No houses uploaded yet.</p>
      } @else {
      <div *ngFor="let house of houses()" class="border p-4 rounded-lg flex gap-4">
        <img [src]="house.url" alt="House Image" class="w-32 h-24 object-cover rounded" />
        <div>
          <p><strong>Price:</strong> {{ house.meta.price }}</p>
          <p><strong>Location:</strong> {{ house.meta.location }}</p>
          <p><strong>Description:</strong> {{ house.meta.description }}</p>
        </div>
      </div>
      }
    </div>
  `,
})
export class GetHouse implements OnInit {
  private http = inject(HttpClient);
  houses = signal<House[]>([]);

  async ngOnInit() {
    try {
      const res: any = await firstValueFrom(this.http.get('http://localhost:4442/upload'));
      this.houses.set(res); // assuming backend returns array of uploaded houses
    } catch (err) {
      console.error('Failed to fetch houses:', err);
    }
  }
}
