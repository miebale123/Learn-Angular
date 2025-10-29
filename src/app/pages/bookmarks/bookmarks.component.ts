import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin } from 'lucide-angular';
import { HousesStore } from '../../house/house.store';

@Component({
  selector: 'bookmarks',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="p-6 max-w-3xl mx-auto mt-24">
      <h2 class="text-xl font-bold mb-4 text-white">Your Bookmarks</h2>

      @if (bookmarks().length === 0) {
      <p class="text-gray-400">You don’t have any bookmarks yet.</p>
      } @else {
      <ul class="flex flex-wrap gap-6">
        @for (item of bookmarks(); track $index) {
        <li
          class="relative rounded-2xl p-5 text-white shadow-lg border border-[#3a2616]/50 bg-[#1a1a1a]"
        >
          <img [src]="item.secure_url" alt="" class="w-60 h-72 rounded-lg mb-3 object-cover" />

          <!-- Location and price info -->
          <div
            class="text-sm text-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          >
            <div class="flex items-center gap-1">
              <lucide-icon [name]="mapPin" class="w-4 h-4 text-orange-400"></lucide-icon>
              <p>{{ item.location || 'Unknown location' }}</p>
            </div>

            <p class="text-gray-200 font-semibold">
              {{ item.price ? '$' + item.price : 'N/A' }}
            </p>
          </div>
        </li>
        }
      </ul>
      }
    </div>
  `,
})
export class Bookmarks implements OnInit {
  housesStore = inject(HousesStore);
  bookmarks = this.housesStore.bookmarks;
  mapPin = MapPin;

  ngOnInit() {
    this.housesStore.loadBookmarks();
  }
}
