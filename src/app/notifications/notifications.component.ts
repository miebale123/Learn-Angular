// import { Component, ElementRef, inject, signal } from '@angular/core';
// import { HousesStore } from '../houses/houses.store';
// import { jwtDecode } from 'jwt-decode';
// import { AuthStateService } from '../core/auth/auth-state.service';
// import { io } from 'socket.io-client';
// import { Router } from '@angular/router';
// import { LucideAngularModule, EllipsisVertical, Trash } from 'lucide-angular';
// import { patchState } from '@ngrx/signals';

// @Component({
//   selector: 'notifications',
//   imports: [LucideAngularModule],
//   host: {
//     '(document:click)': 'onDocumentClick($event)',
//   },
//   template: `
//     <div class="p-4 flex justify-center">
//       <div class="w-full max-w-xl">
//         <h2 class="text-2xl font-semibold mt-10 mb-4 text-gray-200">Notifications</h2>

//         <!-- List -->
//         <div class="space-y-3">
//           @for (n of store.notifications(); track $index) {
//           <div
//             class="p-4 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700
//                    transition cursor-pointer shadow-sm hover:shadow-md"
//             (click)="getHouse(n.house.id)"
//             #cardRef
//           >
//             <div class="flex justify-between">
//               <div>
//                 <p class=" text-sm ">
//                   <span class="font-semibold text-indigo-400">{{ n.type }}</span>
//                   for a house in
//                   <span class="font-medium">{{ n.house.location }}</span>
//                 </p>
//               </div>

//               <button class="p-2" (click)="openDropdown($event, n.id, cardRef)">
//                 <lucide-icon [name]="ev" class="w-5 h-5"></lucide-icon>
//               </button>

//               @if(open() === n.id) {
//               <div
//                 class="border bg-red-600 p-2 rounded absolute mt-6 right-3 z-10"
//                 (click)="$event.stopPropagation()"
//               >
//                 <div class="flex items-center gap-2" (click)="deleteNotification(n.id, $event)">
//                   <lucide-icon [name]="t" class="w-5 h-5"></lucide-icon>
//                   <span>Delete notification</span>
//                 </div>
//               </div>
//               }
//             </div>
//           </div>
//           }
//         </div>

//         @if (store.notifications().length === 0) {
//         <p class=" text-sm mt-6">No notifications yet.</p>
//         }
//       </div>
//     </div>
//   `,
// })
// export class Notifications {
//   store = inject(HousesStore);
//   router = inject(Router);
//   auth = inject(AuthStateService);

//   socket;

//   ev = EllipsisVertical;
//   t = Trash;

//   async ngOnInit() {
//     await this.store.getNotifications();
//   }

//   constructor() {
//     const token = this.auth.accessToken();
//     let userId = null;

//     if (token) {
//       userId = jwtDecode<{ sub: number }>(token).sub;
//     }

//     this.socket = io('http://localhost:4442', {
//       query: { userId },
//     });

//     this.socket.on('notification', () => {
//       this.store.getNotifications();
//     });
//   }

//   async getHouse(id: string) {
//     await this.store.getHouse(id);
//     this.router.navigateByUrl('/house');
//   }

//   open = signal<string | null>(null);
//   activeElement: HTMLElement | null = null;

//   openDropdown(event: Event, id: string, host: HTMLElement) {
//     event.stopPropagation();
//     this.open.set(this.open() === id ? null : id);
//   }

//   deleteNotification(id: string, event: Event) {
//     event.stopPropagation();
//     this.store.deleteNotification(id);
//   }

//   private el = inject(ElementRef);

//   onDocumentClick(event: Event) {
//     if (!this.activeElement) {
//       this.open.set(null);
//       return;
//     }

//     const clickedInside = this.activeElement.contains(event.target as Node);

//     if (!clickedInside) {
//       this.open.set(null);
//     }
//   }
// }
