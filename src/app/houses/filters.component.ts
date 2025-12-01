import { Component, inject, signal } from '@angular/core';
import {
  ArrowDown,
  Building,
  Building2,
  ChevronDown,
  Home,
  LucideAngularModule,
  TreePine,
} from 'lucide-angular';
import { HousesStore } from './houses.store';

@Component({
  selector: 'filters',
  imports: [LucideAngularModule],
  template: `
    <div class="flex justify-bewteen items-center">
      <div class="flex items-center justify-center gap-2">
        <!-- Price Filter -->
        <div class="flex items-center justify-center gap-2">
          <div class="flex items-center justify-center gap-2">
            <div class="relative sm:w-auto w-full">
              <button
                class="w-full sm:w-28 px-4 py-2 bg-white border border-gray-300
         rounded-xl flex items-center justify-around shadow-sm font-medium text-gray-700"
                (click)="priceOpen.set(!priceOpen())"
              >
                Price
                <lucide-icon [name]="cdown" class="w-4 h-4 text-black"></lucide-icon>
              </button>

              @if(priceOpen()) {
              <div
                class="absolute mt-3 bg-white border border-gray-200 rounded-xl shadow-xl
         w-80 p-5 z-50"
              >
                <!-- Header -->
                <div class="flex items-center justify-around mb-4">
                  <div class="text-lg font-semibold text-gray-800">Price</div>

                  <button
                    class="text-indigo-500 text-sm font-medium"
                    (click)="applyPriceRange(); priceOpen.set(false)"
                  >
                    Done
                  </button>
                </div>

                <!-- Tabs -->
                <div class="grid grid-cols-2 bg-gray-100 rounded-xl mb-5 p-1">
                  <button
                    class="py-2 rounded-lg text-sm font-medium"
                    [class.bg-black]="priceTab() === 'list'"
                    [class.shadow]="priceTab() === 'list'"
                    [class.text-white]="priceTab() === 'list'"
                    (click)="priceTab.set('list')"
                  >
                    List price
                  </button>

                  <button
                    class="py-2 rounded-lg text-sm font-medium"
                    [class.text-white]="priceTab() === 'monthly'"
                    [class.bg-black]="priceTab() === 'monthly'"
                    [class.shadow]="priceTab() === 'monthly'"
                    (click)="priceTab.set('monthly')"
                  >
                    Monthly payment
                  </button>
                </div>

                <!-- LIST PRICE UI (Functional) -->
                @if(priceTab() === 'list') {
                <div>
                  <div class="flex items-center gap-3 mb-5">
                    <!-- Min Price -->
                    <div class="relative flex-1">
                      <button
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-left
                 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-around"
                        (click)="toggleMinDropdown()"
                      >
                        {{ store.minPrice() ?? '$ No min' }}
                        <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-400"></lucide-icon>
                      </button>

                      @if(minPriceOpen()) {
                      <ul
                        class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg
                 max-h-40 overflow-y-auto shadow z-50"
                      >
                        <li
                          class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          (mousedown)="store.set('minPrice', null); minPriceOpen.set(false)"
                        >
                          $ No min
                        </li>

                        @for(price of store.priceOptions(); track $index) {
                        <li
                          class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          (mousedown)="store.set('minPrice', price); minPriceOpen.set(false)"
                        >
                          {{ price }}
                        </li>
                        }
                      </ul>
                      }
                    </div>

                    <span class="text-gray-500">-</span>

                    <!-- Max Price -->
                    <div class="relative flex-1">
                      <button
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left
                 hover:bg-gray-100 transition flex items-center justify-around"
                        (click)="toggleMaxDropdown()"
                      >
                        {{ store.maxPrice() ?? '$ No max' }}
                        <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-400"></lucide-icon>
                      </button>

                      @if(maxPriceOpen()) {
                      <ul
                        class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg
                 max-h-40 overflow-y-auto shadow z-50"
                      >
                        <li
                          class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          (mousedown)="store.set('maxPrice', null); maxPriceOpen.set(false)"
                        >
                          $ No max
                        </li>

                        @for(price of store.priceOptions(); track $index) {
                        <li
                          class="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          (mousedown)="store.set('maxPrice', price); maxPriceOpen.set(false)"
                        >
                          {{ price }}
                        </li>
                        }
                      </ul>
                      }
                    </div>
                  </div>
                </div>
                }

                <!-- MONTHLY PAYMENT UI (NO LOGIC) -->
                @if(priceTab() === 'monthly') {
                <div class="text-sm text-gray-500 mb-5">
                  Monthly payment UI placeholder (no functionality yet)
                </div>
                }

                <!-- More Price Options -->
                <div class="pt-4 border-t border-gray-200">
                  <label class="text-black">More price options</label>
                  <label class="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" class="w-4 h-4" />
                    <span class="text-sm text-gray-700">Price reduced</span>
                  </label>
                </div>
              </div>
              }
            </div>
          </div>

          <!-- Rooms Filter -->
          <div class="relative sm:w-auto w-full">
            <button
              class="w-full sm:w-28 px-4 py-2 bg-white border border-gray-300
      rounded-xl flex items-center justify-around shadow-sm
      font-medium text-gray-700"
              (click)="roomsOpen.set(!roomsOpen())"
            >
              Rooms
              <lucide-icon [name]="cdown" class="w-4 h-4 text-black"></lucide-icon>
            </button>

            @if (roomsOpen()) {
            <div
              class="absolute mt-3 bg-white border border-gray-200 rounded-xl shadow-xl
      w-80 p-5 z-50"
            >
              <div class="flex items-center justify-around mb-4">
                <div class="font-semibold text-gray-700">Rooms</div>
                <button class="text-indigo-500 text-sm" (click)="applyRooms()">Done</button>
              </div>

              <!-- Bedrooms -->
              <div class="mb-4">
                <div class="font-medium text-gray-700 mb-2">Bedrooms</div>

                <div class="flex items-center gap-3">
                  <!-- Min Bedroom -->
                  <div class="relative flex-1">
                    <button
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left
              flex items-center justify-around hover:bg-gray-100"
                      (click)="minBedroomOpen.set(!minBedroomOpen())"
                    >
                      {{ store.minBedroom() ?? 'No min' }}
                      <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-500"></lucide-icon>
                    </button>

                    @if (minBedroomOpen()) {
                    <ul
                      class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg max-h-40
              overflow-y-auto shadow z-50"
                    >
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('minBedroom', null); minBedroomOpen.set(false)"
                      >
                        No min
                      </li>

                      @for(n of store.bedroomCounts(); track $index) {
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('minBedroom', n); minBedroomOpen.set(false)"
                      >
                        {{ n }}
                      </li>
                      }
                    </ul>
                    }
                  </div>

                  <span class="text-gray-400">-</span>

                  <!-- Max Bedroom -->
                  <div class="relative flex-1">
                    <button
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left
              flex items-center justify-around hover:bg-gray-100"
                      (click)="maxBedroomOpen.set(!maxBedroomOpen())"
                    >
                      {{ store.maxBedroom() ?? 'No max' }}
                      <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-500"></lucide-icon>
                    </button>

                    @if (maxBedroomOpen()) {
                    <ul
                      class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg max-h-40
              overflow-y-auto shadow z-50"
                    >
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('maxBedroom', null); maxBedroomOpen.set(false)"
                      >
                        No max
                      </li>

                      @for(n of store.bedroomCounts(); track $index) {
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('maxBedroom', n); maxBedroomOpen.set(false)"
                      >
                        {{ n }}
                      </li>
                      }
                    </ul>
                    }
                  </div>
                </div>
              </div>

              <!-- Bathrooms -->
              <div>
                <div class="font-medium text-gray-700 mb-2">Bathrooms</div>

                <div class="flex items-center gap-3">
                  <!-- Min Bath -->
                  <div class="relative flex-1">
                    <button
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left
              flex items-center justify-around hover:bg-gray-100"
                      (click)="minBathroomOpen.set(!minBathroomOpen())"
                    >
                      {{ store.minBathroom() ?? 'No min' }}
                      <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-500"></lucide-icon>
                    </button>

                    @if (minBathroomOpen()) {
                    <ul
                      class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg max-h-40
              overflow-y-auto shadow z-50"
                    >
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('minBathroom', null); minBathroomOpen.set(false)"
                      >
                        No min
                      </li>

                      @for(n of store.bathroomCounts(); track $index) {
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('minBathroom', n); minBathroomOpen.set(false)"
                      >
                        {{ n }}
                      </li>
                      }
                    </ul>
                    }
                  </div>

                  <span class="text-gray-400">-</span>

                  <!-- Max Bath -->
                  <div class="relative flex-1">
                    <button
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-left
              flex items-center justify-around hover:bg-gray-100"
                      (click)="maxBathroomOpen.set(!maxBathroomOpen())"
                    >
                      {{ store.maxBathroom() ?? 'No max' }}
                      <lucide-icon [name]="cdown" class="w-4 h-4 text-gray-500"></lucide-icon>
                    </button>

                    @if (maxBathroomOpen()) {
                    <ul
                      class="absolute mt-1 w-full border border-gray-200 bg-white rounded-lg max-h-40
              overflow-y-auto shadow z-50"
                    >
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('maxBathroom', null); maxBathroomOpen.set(false)"
                      >
                        No max
                      </li>

                      @for(n of store.bathroomCounts(); track $index) {
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        (mousedown)="store.set('maxBathroom', n); maxBathroomOpen.set(false)"
                      >
                        {{ n }}
                      </li>
                      }
                    </ul>
                    }
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>

          <!-- PROPERTY TYPE -->
      <div class="relative sm:w-auto w-full">
        <button
        class="w-full sm:w-40 px-8 py-2 bg-white border border-gray-300
        rounded-xl flex items-center justify-center gap-2
        shadow-sm font-medium text-gray-700 whitespace-nowrap"
        (click)="propertyTypeOpen.set(!propertyTypeOpen())"
        >
          Property type
          <lucide-icon [name]="cdown" class="w-4 h-4"></lucide-icon>
        </button>

        @if (propertyTypeOpen()) {
        <div
          class="absolute mt-3 bg-white border border-gray-200 rounded-xl shadow-xl
    w-96 p-5  z-50"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="text-lg font-semibold text-gray-800">Property type</div>

            <button
              class="text-indigo-500 text-sm font-medium"
              (click)="propertyTypeOpen.set(false)"
            >
              Done
            </button>
          </div>

          <!-- GRID -->
          <div class="grid grid-cols-3 gap-3">
            @for (p of propertyTypes; track $index) {
            <button
              class="p-4 border rounded-xl flex flex-col items-center gap-2 text-sm
        transition"
              [class.bg-black]="store.property_type() === p.value"
              [class.text-white]="store.property_type() === p.value"
              [class.border-gray-900]="store.property_type() === p.value"
              (click)="selectPropertyType(p.value)"
            >
              <lucide-icon [name]="p.icon" class="w-5 h-5"></lucide-icon>
              {{ p.label }}
            </button>
            }
          </div>
        </div>
        }
      </div>

        <div class="flex items-center justify-start gap-3 px-4 py-3">
          <!-- SAVE SEARCH -->

          <!-- MORE -->
          <div class="relative">
            <button
              class="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm flex items-center gap-1 text-sm font-medium"
              (click)="moreOpen.set(!moreOpen())"
            >
              More
              <lucide-icon [name]="cdown" class="w-4 h-4 text-black"></lucide-icon>
            </button>

            @if(moreOpen()) {
            <div
              class="absolute mt-2 bg-white border border-gray-200 shadow-xl rounded-xl p-4 w-80 z-50"
            >
              <div class="font-semibold mb-3">More filters</div>

              <label class="flex items-center gap-2 mb-2">
                <input type="checkbox" class="rounded" />
                Pool
              </label>

              <label class="flex items-center gap-2 mb-2">
                <input type="checkbox" class="rounded" />
                New construction
              </label>

              <label class="flex items-center gap-2 mb-2">
                <input type="checkbox" class="rounded" />
                Garage
              </label>

              <button
                class="mt-3 text-indigo-600 text-sm font-medium"
                (click)="moreOpen.set(false)"
              >
                Done
              </button>
            </div>
            }
          </div>
          <button
            class="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium"
          >
            Save search
          </button>
        </div>

        <!-- FILTER BAR -->
      </div>


    </div>
  `,
})
export class Filters {
  store = inject(HousesStore);
  down = ArrowDown;
  cdown = ChevronDown;

  priceOpen = signal(false);
  minPriceOpen = signal(false);
  maxPriceOpen = signal(false);

  bedroomOpen = signal(false);
  minBedroomOpen = signal(false);
  maxBedroomOpen = signal(false);

  bathroomOpen = signal(false);
  minBathroomOpen = signal(false);
  maxBathroomOpen = signal(false);

  closeAll() {
    this.priceOpen.set(false);
    this.minPriceOpen.set(false);
    this.maxPriceOpen.set(false);

    this.bedroomOpen.set(false);
    this.minBedroomOpen.set(false);
    this.maxBedroomOpen.set(false);
  }
  closeBath() {
    this.bathroomOpen.set(false);
    this.minBathroomOpen.set(false);
    this.maxBathroomOpen.set(false);
  }

  toggleMinDropdown() {
    this.minPriceOpen.set(!this.minPriceOpen());
    if (this.minPriceOpen()) this.maxPriceOpen.set(false);
  }

  toggleMaxDropdown() {
    this.maxPriceOpen.set(!this.maxPriceOpen());
    if (this.maxPriceOpen()) this.minPriceOpen.set(false);
  }

  toggleMinBedroom() {
    this.minBedroomOpen.set(!this.minBedroomOpen());
    if (this.minBedroomOpen()) this.maxBedroomOpen.set(false);
  }

  toggleMaxBedroom() {
    this.maxBedroomOpen.set(!this.maxBedroomOpen());
    if (this.maxBedroomOpen()) this.minBedroomOpen.set(false);
  }

  toggleMinBathroom() {
    this.minBathroomOpen.set(!this.minBathroomOpen());
    if (this.minBathroomOpen()) this.maxBathroomOpen.set(false);
  }

  toggleMaxBathroom() {
    this.maxBathroomOpen.set(!this.maxBathroomOpen());
    if (this.maxBathroomOpen()) this.minBathroomOpen.set(false);
  }

  applyPriceRange() {
    this.store.setSearchPrice(this.store.minPrice(), this.store.maxPrice());
    this.store.getHouses();
    this.closeAll();
  }

  applyBedroomRange() {
    this.store.setSearchBedroom(this.store.minBedroom(), this.store.maxBedroom());
    this.store.getHouses();
    this.closeAll();
  }

  applyBathroomRange() {
    this.store.setSearchBathroom(this.store.minBathroom(), this.store.maxBathroom());
    this.store.getHouses();
    this.closeBath();
  }

  roomsOpen = signal(false);

  applyRooms() {
    this.store.setSearchBedroom(this.store.minBedroom(), this.store.maxBedroom());
    this.store.setSearchBathroom(this.store.minBathroom(), this.store.maxBathroom());
    this.store.getHouses();
    this.roomsOpen.set(false);
  }

  priceTab = signal<'list' | 'monthly'>('list');

  viewMode: 'list' | 'map' = 'list';

  moreOpen = signal(false);
  propertyTypeOpen = signal(false);

  home = Home;
  building = Building;
  building2 = Building2;
  tree = TreePine;

  propertyTypes = [
    { label: 'Any', value: null, icon: this.home },
    { label: 'House', value: 'house', icon: this.home },
    { label: 'Condo', value: 'condo', icon: this.building },
    { label: 'Townhome', value: 'townhome', icon: this.home },
    { label: 'Multi family', value: 'multi', icon: this.building2 },
    { label: 'Mobile', value: 'mobile', icon: this.home },
    { label: 'Farm', value: 'farm', icon: this.home },
    { label: 'Land', value: 'land', icon: this.tree },
  ];

  selectPropertyType(type: any) {
    this.store.setPropertyType(type);
  }
}
