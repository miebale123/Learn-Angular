import { Component, inject, OnInit } from '@angular/core';
import { HousesStore } from '../house.store';
import { LucideAngularModule, Bookmark, MapPin, Phone } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'houses',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <ul class="flex flex-wrap gap-6 mt-8 justify-center">
      @for (house of housesStore.houses(); track house.id) {
      <li
        class="relative bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-gray-700 p-4 w-64 hover:scale-[1.02] transition-transform"
      >
        <img [src]="house.secure_url" class="w-full h-48 object-cover rounded-lg mb-3" />

        <div
          class="text-gray-200 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2"
        >
          <div class="flex items-center gap-1">
            <lucide-icon [name]="locate" class="w-4 h-4 text-orange-400"></lucide-icon>
            <p>{{ house.location || 'Unknown' }}</p>
          </div>

          <!-- price -->
          <p class="text-gray-300 font-semibold">
            {{ house.price ? '$' + house.price : 'N/A' }}
          </p>
          <lucide-icon
            [name]="bookmark"
            class="w-5 h-5 text-blue-400 hover:text-blue-600 cursor-pointer"
            (click)="addToBookmark(house.id)"
          ></lucide-icon>

          <lucide-icon
            [name]="phone"
            class="w-5 h-5 text-blue-400 hover:text-blue-600 cursor-pointer"
          ></lucide-icon>
        </div>
      </li>
      }
    </ul>
  `,
})
export class Houses implements OnInit {
  housesStore = inject(HousesStore);
  bookmark = Bookmark;
  locate = MapPin;
  phone = Phone;

  ngOnInit() {
    this.housesStore.loadAll();
  }

  addToBookmark(id: number) {
    this.housesStore.findHouse(id);
  }
}
