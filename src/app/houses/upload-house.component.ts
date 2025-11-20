// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HousesStore } from '../house.store';

// @Component({
//   selector: 'upload-house',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="max-w-md mx-auto p-6 bg-black rounded-2xl shadow-lg mt-10">
//       <h1 class="text-2xl font-bold mb-6 text-center">Upload Your House</h1>

//       <div class="flex flex-col space-y-4">
//         <label
//           class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:border-blue-500 transition"
//         >
//           <span class="text-gray-500 mb-2">Click to select an image</span>
//           <input type="file" (change)="onFileSelected($event)" class="hidden" />
//           @if (store.file()) {
//             <span class="text-green-600 font-medium">{{ store.file()?.name }}</span>
//           }
//         </label>

//         <input
//           type="text"
//           [ngModel]="store.location()"
//           (ngModelChange)="store.setLocation($event)"
//           placeholder="Location"
//           class="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="text"
//           [ngModel]="store.price()"
//           (ngModelChange)="store.setPrice($event)"
//           placeholder="Price"
//           class="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           (click)="store.uploadHouse()"
//           class="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
//         >
//           Upload House
//         </button>
//       </div>
//     </div>
//   `,
// })
// export class UploadHouse {
//   store = inject(HousesStore);

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (!input.files?.length) return;
//     this.store.setFile(input.files[0]);
//   }
// }
