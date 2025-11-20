import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HousesStore } from './houses.store';
import { io } from 'socket.io-client';
import { LucideAngularModule, Heart, ArrowDown } from 'lucide-angular';
import { jwtDecode } from 'jwt-decode';
import { AuthStateService } from '../core/auth/auth-state.service';

@Component({
  selector: 'houses',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="p-4 space-y-6 ">
      <!-- search -->
      <div class="flex gap-2 ">
        <div class="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by location"
            [ngModel]="store.searchLocation()"
            (ngModelChange)="store.setSearchLocation($event)"
          />
        </div>

        <div class="relative ">
          <button class="border px-2 py-1 rounded" (click)="priceDropdownOpen = !priceDropdownOpen">
            Price
          </button>

          @if(priceDropdownOpen) {
          <div class="absolute z-10 bg-white border rounded p-3 mt-1 shadow w-48 text-black">
            <input
              placeholder="Min price"
              [ngModel]="minPrice"
              (ngModelChange)="minPrice = $event"
            />

            <input
              placeholder="Max price"
              [ngModel]="maxPrice"
              (ngModelChange)="maxPrice = $event"
            />

            <button class="border px-2 py-1 rounded w-full" (click)="applyPriceRange()">
              Done
            </button>
          </div>
          }
        </div>
      </div>

      <!-- upload -->
      <div>
        <select
          class="border px-2 py-1"
          [ngModel]="store.type()"
          (ngModelChange)="store.setType($event!)"
        >
          @for(t of ['for rent', 'for sale']; track t) {
          <option [value]="t">{{ t }}</option>
          }
        </select>

        <select
          class="border px-2 py-1"
          [ngModel]="store.property_type()"
          (ngModelChange)="store.setPropertyType($event!)"
        >
          @for(p of ['condo','house','land']; track p) {
          <option [value]="p">{{ p }}</option>
          }
        </select>

        <label class="border px-2 py-1 rounded cursor-pointer">
          Choose image
          <input type="file" (change)="onFileSelected($event)" class="hidden" />
        </label>

        <!-- Preview -->
        @if(uploadedPreview()) {
        <img [src]="uploadedPreview()" alt="Preview" class="w-48 h-48 object-cover rounded mt-2" />
        }
        <div class="flex gap-2">
          <input
            type="text"
            [ngModel]="store.location()"
            (ngModelChange)="store.setLocation($event)"
          />

          <input
            placeholder="Bedrooms"
            [ngModel]="store.bedroom()"
            (ngModelChange)="store.setBedroom($event)"
          />

          <input
            placeholder="Bathrooms"
            [ngModel]="store.bathroom()"
            (ngModelChange)="store.setBathroom($event)"
          />

          <input
            placeholder="Bedrooms"
            [ngModel]="store.area()"
            (ngModelChange)="store.setArea($event)"
          />

          <button class="border px-2" (click)="upload()">upload</button>
        </div>
      </div>

      <!-- All houses -->
      <div>
        <h2 class="text-xl font-semibold">the total houses are:</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for(house of store.filteredHouses(); track $index) {

          <div
            class="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
          >
            <!-- Big image -->
            <img [src]="house.secure_url" alt="House Image" class="w-full h-60 object-cover" />

            <!-- Content -->
            <div class="p-4 space-y-2">
              <!-- Status + Price -->
              <p class="font-semibold text-sm capitalize text-black">
                {{ house.property_type }} {{ house.type }}
              </p>

              <p class="text-2xl font-bold text-black flex items-center gap-2 text-black!">
                $ {{ house.price }}

                @if(house.priceReduced) {
                <lucide-icon [name]="down" class="w-4 h-4"></lucide-icon>
                <span class="text-red-600 text-sm">
                  - {{ house.previousPrice! - house.price }}
                </span>
                }
              </p>

              <!-- Beds / Baths / Sqft -->
              <div class="flex items-center gap-4 text-gray-700 text-sm">
                <span>{{ house.bedroom }} bed</span>
                <span>{{ house.bathroom }} bath</span>
                <span>{{ house.area }} sqft</span>
              </div>

              <!-- Location -->
              <p class="text-gray-800 text-sm">
                {{ house.location }}
              </p>

              <!-- Bookmark -->
              <button
                class="mt-3 border px-3 py-1 rounded hover:bg-gray-100"
                (click)="store.createBookmark(house.id)"
              >
                <lucide-icon [name]="heart" class="w-5 h-5 bg-black"></lucide-icon>
              </button>
            </div>
          </div>

          }
        </div>
      </div>

      <!-- My houses -->
      <div class="flex flex-col lg:flex-row gap-10 mt-10">
        <div class="flex-1">
          <h2 class="text-xl font-semibold mb-4">your created houses are:</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @for(house of store.myHouses(); track $index) {
            <div class="border p-3 rounded shadow hover:shadow-lg transition">
              @if(editingHouseId() === house.id) {
              <input
                type="text"
                [ngModel]="editedLocation"
                (ngModelChange)="editedLocation = $event"
              />

              <input type="text" [ngModel]="editedPrice" (ngModelChange)="editedPrice = $event" />

              <input
                placeholder="Bedrooms"
                [ngModel]="editedBedroom"
                (ngModelChange)="editedBedroom = $event"
              />

              <input
                placeholder="Bathrooms"
                [ngModel]="editedBathroom"
                (ngModelChange)="editedBathroom = $event"
              />

              <input
                placeholder="area"
                [ngModel]="editedArea"
                (ngModelChange)="editedArea = $event"
              />

              <button class="border px-2 rounded hover:bg-gray-100" (click)="confirmSave(house.id)">
                save
              </button>
              } @else {
              <img
                [src]="house.secure_url"
                alt="House Image"
                class="w-full h-40 object-cover rounded mb-2"
              />
              type:
              <p class="font-medium">{{ house.type }}</p>
              <p class="font-medium">{{ house.property_type }}</p>
              <p class="font-medium">{{ house.location }}</p>
              <p class="font-medium">
                <strong> <span>$</span>{{ house.price }} </strong>
              </p>
              bed:
              <p class="font-medium">{{ house.bedroom }}</p>
              bath:
              <p class="font-medium">{{ house.bathroom }}</p>

              area:
              <p class="font-medium">{{ house.area }}</p>

              <p class="text-sm text-gray-500">{{ house.userId }}</p>
              <div class="flex gap-2 mt-2">
                <button class="border px-2 rounded hover:bg-gray-100" (click)="startEdit(house)">
                  edit
                </button>
                <button
                  class="border px-2 rounded hover:bg-gray-100"
                  (click)="store.deleteHouse(house.id)"
                >
                  delete
                </button>
              </div>
              }
            </div>
            }
          </div>
        </div>

        <!-- Bookmarks -->
        <div class="flex-1">
          <h2 class="text-xl font-semibold mb-4">bookmarked are:</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @for(b of store.bookmarks(); track $index) {
            <div class="border p-2 rounded shadow hover:shadow-lg transition">
              <img
                [src]="b.house.secure_url"
                alt="House Image"
                class="w-full h-40 object-cover rounded mb-2"
              />
              <p class="font-medium">{{ b.house.location }}</p>
              <button
                class="mt-2 border px-2 rounded hover:bg-gray-100"
                (click)="store.deleteBookmark(b.id)"
              >
                delete
              </button>
            </div>
            }
          </div>
        </div>
      </div>

      <!-- Notifications  -->
      <div>
        <h2 class="text-xl font-semibold mt-10">notifications</h2>
        <ul class="space-y-1">
          @for(n of store.notifications(); track $index) {
          <li class="border p-2 rounded">
            {{ n.type }} — {{ n.house.location }} — {{ n.house.id }} — {{ n.house.userId }}
          </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class Houses {
  store = inject(HousesStore);
  editingHouseId = signal<string | null>(null);
  editedLocation = '';
  editedPrice = 0;
  editedBedroom = 0;
  editedBathroom = 0;
  editedArea = '';
  heart = Heart;
  down = ArrowDown;
  priceDropdownOpen = false;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  uploadedPreview = signal<string | null>(null);

  applyPriceRange() {
    this.store.setSearchPrice(this.minPrice, this.maxPrice);
    this.priceDropdownOpen = false;
  }

  auth = inject(AuthStateService);

  socket;

  constructor() {
    const token = this.auth.accessToken();
    let userId = null;

    if (token) {
      userId = jwtDecode<{ sub: number }>(token).sub;
    }

    this.socket = io('http://localhost:4442', {
      query: { userId },
    });

    this.socket.on('notification', () => {
      this.store.getNotifications();
    });
  }

  async ngOnInit() {
    await this.store.getHouses();
    await this.store.getBookmarks();
    await this.store.getNotifications();
  }

  startEdit(house: {
    id: string;
    location: string;
    price: number;
    bedroom: number;
    bathroom: number;
    area: string;
  }) {
    this.editingHouseId.set(house.id);
    this.editedLocation = house.location;
    this.editedPrice = house.price;
    this.editedBedroom = house.bedroom;
    this.editedBathroom = house.bathroom;
    this.editedArea = house.area;
  }

  async confirmSave(id: string) {
    await this.store.updateHouse(
      id,
      this.editedLocation,
      this.editedPrice,
      this.editedBedroom,
      this.editedBathroom,
      this.editedArea
    );
    this.editingHouseId.set(null);
    this.editedLocation = '';
    this.editedPrice = 0;
    this.editedBedroom = 0;
    this.editedBathroom = 0;
    this.editedArea = '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.store.setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedPreview.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  async upload() {
    await this.store.uploadHouse(); // remove location()
    this.uploadedPreview.set(null);
  }
}
