// // src/app/bookmarks/bookmarks.component.ts
// import { Component, effect, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LucideAngularModule, Trash2 } from 'lucide-angular';
// import { BookmarkStore } from './bookmarks.store';

// @Component({
//   selector: 'bookmarks',
//   standalone: true,
//   imports: [CommonModule, LucideAngularModule],
//   template: `
//     <div class="p-6 max-w-3xl mx-auto mt-24">
//       <h2 class="text-xl font-bold mb-4 text-white">Your Bookmarks</h2>

//       @if (bookmarks().length === 0) {
//         <p class="text-gray-400">You don’t have any bookmarks yet.</p>
//       } @else {
//         <ul class="space-y-6">
//           @for (item of bookmarks(); track item.id) {
//             <li
//               class="rounded-2xl p-5 text-white shadow-lg border border-[#3a2616]/50
//                      prose prose-invert max-w-none relative"
//             >
//               <p class="text-xs text-gray-400 italic">posted by {{ item.email }}</p>
//               <div [innerHTML]="item.safeTitle"></div>

//               <lucide-icon
//                 [name]="trash"
//                 class="w-4 h-4 absolute top-4 right-4 text-red-400 hover:text-red-600 cursor-pointer"
//                 (click)="onDelete(item.id)"
//               ></lucide-icon>
//             </li>
//           }
//         </ul>
//       }
//     </div>
//   `,
// })
// export class Bookmarks {
//   private store = inject(BookmarkStore);
//   bookmarks = this.store.bookmarks;
//   trash = Trash2;

//   constructor() {
//     this.store.loadAll();
//     effect(() => {
//       console.log('Bookmarks:', this.bookmarks());
//     });
//   }

//   onDelete(id: number) {
//     this.store.remove(id);
//   }
// }
