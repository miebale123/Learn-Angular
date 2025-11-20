// import { CommonModule } from '@angular/common';
// import { Component, inject, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HousesStore } from './houses.store';
// import { io } from 'socket.io-client';
// import { LucideAngularModule, Bookmark } from 'lucide-angular';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'houses',
//   standalone: true,
//   imports: [CommonModule, FormsModule, LucideAngularModule],
//   template: `
//     <div>
//       <input type="text" [ngModel]="store.location()" (ngModelChange)="store.setLocation($event)" />
//       <button (click)="store.uploadHouse(store.location())">upload</button>

//       <h2>the total houses are:</h2>
//       <ul>
//         @for(house of store.houses(); track $index) {
//         <li>
//           <p>{{ house.location }}</p>
//           <p>{{ house.userId }}</p>
//           <button (click)="store.createBookmark(house.id)">
//             <lucide-icon [name]="bookmark" class="w-5 h-5"></lucide-icon>
//           </button>
//         </li>
//         }
//       </ul>

//       <div class="flex gap-20">
//         <h2>your created houses are:</h2>
//         <ul>
//           @for(house of store.myHouses(); track $index) {
//           <li>
//             @if (editingHouseId()=== house.id) {
//             <input
//               type="text"
//               [ngModel]="editedLocation"
//               (ngModelChange)="editedLocation = $event"
//             />
//             <button (click)="confirmSave(house.id)">save</button>
//             }@else {
//             <p>{{ house.location }}</p>
//             <p>{{ house.userId }}</p>

//             <button (click)="startEdit(house)" class="border">edit</button>
//             <button (click)="store.deleteHouse(house.id)">delete</button>
//             }
//           </li>
//           }
//         </ul>

//         <div>
//           <h2>bookmarked are:</h2>
//           <ul>
//             @for (b of store.bookmarks(); track $index) {
//             <li>
//               {{ b.location }}
//               <button (click)="store.deleteBookmark(b.id)">delete</button>
//             </li>
//             }
//           </ul>
//         </div>
//       </div>

//       <h2>notifications</h2>

//       @for (n of store.notifications(); track $index) {
//       <li>
//         <button>
//           {{ n.type }}
//           {{ n.location }}
//           {{ n.houseId }}
//           {{ n.userId }}
//         </button>
//       </li>
//       }
//     </div>
//   `,
// })
// export class Houses {
//   store = inject(HousesStore);
//   editingHouseId = signal<string | null>(null);
//   editedLocation = '';
//   bookmark = Bookmark;
//   http = inject(HttpClient);

//   socket = io(`http://localhost:4442`);

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (!input.files?.length) return;
//     // this.store.setFile(input.files[0]);
//   }

//   constructor() {
//     this.socket.on('notification', (data) => {
//       console.log('the notifiction actully being listeneed: ', data);
//       this.store.getNotifications();
//     });
//   }

//   async ngOnInit() {
//     await this.store.getHouses();
//     await this.store.getBookmarks();
//     await this.store.getNotifications();
//   }

//   startEdit(house: { id: string; location: string }) {
//     this.editingHouseId.set(house.id);
//     this.editedLocation = house.location;
//   }

//   async confirmSave(id: string) {
//     console.log('when editedLocation before backend: ', this.editedLocation);
//     await this.store.updateHouse(id, this.editedLocation);
//     this.editingHouseId.set(null);
//     this.editedLocation = '';
//   }
// }
