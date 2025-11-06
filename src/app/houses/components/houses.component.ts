import { Component, inject, OnInit } from '@angular/core';
import { HousesStore } from '../house.store';
import { LucideAngularModule, Bookmark, MapPin, Phone } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'houses',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 justify-items-center bg-amber-600"
    >
      @for (house of housesStore.houses(); track house.id) {
      <li
        class="relative bg-[#17173a] overflow-hidden   w-full max-w-28rem hover:scale-[1.02] transition-transform"
      >
        <img [src]="house.secure_url" class="w-full h-52 sm:h-56 md:h-60 object-cover mb-4" />

        <div class="text-gray-200 text-sm flex flex-col gap-4">
          <!-- location -->
          <div class="flex items-center gap-2 text-gray-300">
            <lucide-icon [name]="locate" class="w-4 h-4 "></lucide-icon>
            <p class="truncate">{{ house.location || 'Unknown' }}</p>
          </div>

          <!-- price & icons -->
          <div class="flex items-center justify-between flex-wrap gap-4 text-gray-300 font-medium">
            <p class="text-base md:text-lg">{{ house.price ? '$' + house.price : 'N/A' }}</p>
            <div class="flex items-center gap-4">
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
          </div>
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
