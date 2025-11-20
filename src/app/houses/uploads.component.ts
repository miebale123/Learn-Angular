// import { Component, inject, signal, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HousesStore, HouseDto } from '../../houses/house.store';
// import { LucideAngularModule, MapPin, Bookmark, Phone } from 'lucide-angular';

// @Component({
//   selector: 'my-uploads',
//   standalone: true,
//   imports: [CommonModule, FormsModule, LucideAngularModule],
//   template: `
//     <h2 class="text-xl font-bold mb-6 text-white">My Uploaded Houses</h2>

//     @if (!housesStore.myUploadedHouses().length) {
//       <p class="text-gray-400">You haven't uploaded any yet.</p>
//     } @else {
//       <ul
//         class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 justify-items-center"
//       >
//         @for (item of housesStore.myUploadedHouses(); track item.id ?? $index) {
//           <li
//             class="relative bg-[#17173a] overflow-hidden w-full max-w-28rem hover:scale-[1.02] transition-transform rounded-xl shadow border border-[#2a2a4a]/50 p-4"
//           >
//             <!-- Image -->
//             <div class="mb-3">
//               @if (editingImage() === item.id) {
//                 <input
//                   type="text"
//                   [(ngModel)]="tempImage"
//                   class="p-2 rounded bg-gray-700 text-white w-full"
//                 />
//                 <div class="flex gap-2 mt-2">
//                   <button
//                     (click)="saveField(item, 'image')"
//                     class="bg-green-600 px-3 py-1 rounded"
//                   >
//                     Save
//                   </button>
//                   <button (click)="cancelEdit()" class="bg-gray-600 px-3 py-1 rounded">
//                     Cancel
//                   </button>
//                 </div>
//               } @else {
//                 <img
//                   [src]="item.secure_url"
//                   class="w-full h-52 sm:h-56 md:h-60 object-cover rounded-lg cursor-pointer"
//                   (click)="editField('image', item.id, item.secure_url)"
//                 />
//               }
//             </div>

//             <!-- Details -->
//             <div class="text-gray-200 text-sm flex flex-col gap-4">
//               <!-- Location -->
//               <div class="flex items-center gap-2 text-gray-300">
//                 <lucide-icon [name]="mapPin" class="w-4 h-4 text-orange-400"></lucide-icon>
//                 @if (editingLocation() === item.id) {
//                   <input
//                     [(ngModel)]="tempLocation"
//                     class="p-1 rounded bg-gray-700 text-white w-36"
//                   />
//                   <button
//                     (click)="saveField(item, 'location')"
//                     class="ml-2 bg-green-600 px-2 py-0.5 rounded"
//                   >
//                     Save
//                   </button>
//                 } @else {
//                   <p
//                     (click)="editField('location', item.id, item.location)"
//                     class="cursor-pointer truncate"
//                   >
//                     {{ item.location || 'Unknown' }}
//                   </p>
//                 }
//               </div>

//               <!-- Price & Icons -->
//               <div
//                 class="flex items-center justify-between flex-wrap gap-4 text-gray-300 font-medium"
//               >
//                 @if (editingPrice() === item.id) {
//                   <div class="flex items-center gap-2">
//                     <input
//                       [(ngModel)]="tempPrice"
//                       class="p-1 rounded bg-gray-700 text-white w-24"
//                     />
//                     <button
//                       (click)="saveField(item, 'price')"
//                       class="bg-green-600 px-2 py-0.5 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       (click)="cancelEdit()"
//                       class="bg-gray-600 px-2 py-0.5 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 } @else {
//                   <p
//                     (click)="editField('price', item.id, item.price)"
//                     class="cursor-pointer text-base md:text-lg"
//                   >
//                     {{ item.price ? '$' + item.price : 'N/A' }}
//                   </p>
//                 }

//                 <div class="flex items-center gap-4">
//                   <lucide-icon
//                     [name]="bookmark"
//                     class="w-5 h-5 text-blue-400 hover:text-blue-600 cursor-pointer"
//                   ></lucide-icon>

//                   <lucide-icon
//                     [name]="phone"
//                     class="w-5 h-5 text-blue-400 hover:text-blue-600 cursor-pointer"
//                   ></lucide-icon>
//                 </div>
//               </div>
//             </div>
//           </li>
//         }
//       </ul>
//     }
//   `,
// })
// export class Uploads implements OnInit {
//   housesStore = inject(HousesStore);
//   mapPin = MapPin;
//   bookmark = Bookmark;
//   phone = Phone;

//   editingLocation = signal<string | null>(null);
//   editingPrice = signal<string | null>(null);
//   editingImage = signal<string | null>(null);

//   tempLocation = '';
//   tempPrice = '';
//   tempImage = '';

//   ngOnInit() {
//     this.housesStore.loadMyHouses?.();
//   }

//   editField(field: 'location' | 'price' | 'image', id: string, value: string) {
//     this.cancelEdit();
//     if (field === 'location') {
//       this.editingLocation.set(id);
//       this.tempLocation = value;
//     } else if (field === 'price') {
//       this.editingPrice.set(id);
//       this.tempPrice = value;
//     } else {
//       this.editingImage.set(id);
//       this.tempImage = value;
//     }
//   }

//   cancelEdit() {
//     this.editingLocation.set(null);
//     this.editingPrice.set(null);
//     this.editingImage.set(null);
//   }

//   saveField(item: HouseDto, field: 'location' | 'price' | 'image') {
//     const dto: Partial<HouseDto> = {};
//     if (field === 'location') dto.location = this.tempLocation;
//     if (field === 'price') dto.price = this.tempPrice;
//     if (field === 'image') dto.secure_url = this.tempImage;

//     this.housesStore.updateHouse(item.id, dto);
//     this.cancelEdit();
//   }
// }
