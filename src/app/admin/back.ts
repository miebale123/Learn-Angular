// import { Component, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { environment } from '../../environments/environments';
// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom, Observable } from 'rxjs';
// import { HousesStore } from '../houses/houses.store';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AdminService {
//   private apiUrl = `${environment.apiBaseUrl}/admin-page/users`;

//   constructor(private readonly http: HttpClient) {}

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.apiUrl);
//   }

//   updateUserRole(user: User): Observable<User> {
//     return this.http.patch<User>(`${this.apiUrl}/${user.id}/role`, {
//       role: user.role,
//     });
//   }
// }

// @Component({
//   selector: 'admin',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <!-- <section class="p-8 max-w-6xl mx-auto">
//       <div class=" shadow-2xl rounded-2xl border ">
//         <h1 class="text-3xl font-extrabold mb-6 text-center tracking-wide">
//           Manage Users & Experts
//         </h1>


//         @if (users.length === 0) {
//         <p class=" text-center py-8 text-lg">Loading users...</p>
//         } @else {
//         <div class="overflow-x-auto rounded-xl ">
//           <table class="min-w-full divide-y divide-gray-700">
//             <thead class="bg-gray-800/60">
//               <tr>
//                 <th class="p-4 text-left font-semibold ">Email</th>
//                 <th class="p-4 text-center font-semibold ">can post?</th>
//                 <th class="p-4 text-center font-semibold ">Actions</th>
//               </tr>
//             </thead>

//             <tbody class="divide-y divide-gray-800">
//               @for (user of users; track $index) {
//               <tr
//                 class="hover:bg-gray-800/50 transition-colors duration-200"
//                 [class.opacity-50]="user.role === 'admin'"
//               >
//                 <td class="p-4 font-medium">{{ user.email }}</td>

//                 <td class="p-4 text-center">
//                   @if (user.role === 'admin') {
//                   <span class="text-yellow-400 font-semibold">Admin</span>
//                   } @else {
//                   <input
//                     type="checkbox"
//                     [checked]="user.role === 'expert'"
//                     (change)="toggleRole(user)"
//                     class="w-5 h-5 accent-yellow-400 cursor-pointer"
//                   />
//                   }
//                 </td>

//                 <td class="p-4 text-center">
//                   <button
//                     (click)="saveUser(user)"
//                     [disabled]="user.role === 'admin'"
//                     class="px-4 py-1.5 bg-yellow-500/80 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
//                   >
//                     Save
//                   </button>
//                 </td>
//               </tr>
//               }
//             </tbody>
//           </table>
//         </div>
//         }
//       </div>
//     </section> -->


//   `,
// })
// export class Admin implements OnInit {
//   users: User[] = [];

//   private adminService = inject(AdminService);

//   http = inject(HttpClient);
//   brokers = signal([]);
//   store = inject(HousesStore);

//   ngOnInit(): void {
//     this.loadUsers();
//     this.loadUnapprovedBrokers();
//   }

//   loadUsers() {
//     this.adminService.getAllUsers().subscribe({
//       next: (data) => (this.users = data),
//       error: (err) => console.error('Failed to load users', err),
//     });
//   }

//   async loadUnapprovedBrokers() {
//     const res: any = await firstValueFrom(
//       this.http.get(`${environment.apiBaseUrl}/admin-page/brokers`)
//     );

//     this.brokers.set(res);

//     console.log(res);
//     console.log('signal brokers are: ', this.brokers());
//   }

//   toggleRole(user: User) {
//     if (user.role === 'admin') return; // prevent changes to admin
//     user.role = user.role === 'expert' ? 'user' : 'expert';
//   }

//   saveUser(user: User) {
//     if (user.role === 'admin') return; // prevent save on admin
//     this.adminService.updateUserRole(user).subscribe({
//       error: (err) => console.error('Failed to update user', err),
//     });
//   }
// }
