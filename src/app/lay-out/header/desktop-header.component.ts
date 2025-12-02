// import { Component } from '@angular/core';
// import { BaseHeader } from './header.component';
// import { LucideAngularModule } from 'lucide-angular';
// import { Logo } from './logo.component';
// import { Signin, Signup } from '../../pages/auth-local/sign-in.component';

// @Component({
//   selector: 'desktop-header',
//   imports: [LucideAngularModule, Logo, Signin, Signup],
//   template: `
//     <header
//       class="left-0 right-0 z-[10001] flex items-center justify-between px-4 md:px-8 py-2 bg-white backdrop-blur-md font-medium shadow-lg"
//     >
//       <!-- LEFT SIDE -->
//       <div class="flex items-center gap-6 ml-20">
//         <button class="md:hidden" (click)="do()">
//           <lucide-icon [name]="menu" class="w-6 h-6"></lucide-icon>
//         </button>

//         <logo />

//         <!-- LEFT NAV LINKS -->
//         <nav class="hidden md:flex items-center gap-6 text-sm">
//           <!-- BUY -->
//           <div class="relative group">
//             <a routerLink="/buy" class="hover:underline">Buy</a>

//             <div
//               class="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg py-3 px-4 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <a routerLink="/buy" class="block py-2 hover:underline">Homes for Sale</a>
//               <a routerLink="/buy/new-construction" class="block py-2 hover:underline"
//                 >New Construction</a
//               >
//               <a routerLink="/buy/recently-sold" class="block py-2 hover:underline"
//                 >Recently Sold</a
//               >
//               <a routerLink="/buy/foreclosures" class="block py-2 hover:underline">Foreclosures</a>
//             </div>
//           </div>

//           <!-- SELL -->
//           <div class="relative group">
//             <button class="hover:underline">Sell/Rent out</button>

//             <div
//               class="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg py-3 px-4 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <button (click)="onNewPostClick()" class="block text-left py-2 hover:underline">
//                 Post Your Home
//               </button>
//               <a routerLink="/sell/home-value" class="block py-2 hover:underline">Home Value</a>
//               <a routerLink="/sell/tips" class="block py-2 hover:underline">Selling Tips</a>
//             </div>
//           </div>

//           <!-- RENT -->
//           <div class="relative group">
//             <a routerLink="/rent" class="hover:underline">Rent</a>

//             <div
//               class="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg py-3 px-4 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <a routerLink="/rent" class="block py-2 hover:underline">Homes for Rent</a>
//               <a routerLink="/rent/apartments" class="block py-2 hover:underline">Apartments</a>
//               <a routerLink="/rent/condos" class="block py-2 hover:underline">Condos</a>
//               <a routerLink="/rent/cheap-rentals" class="block py-2 hover:underline"
//                 >Cheap Rentals</a
//               >
//             </div>
//           </div>

//           <!-- Other links -->
//           @if(!auth.isExpert()){
//           <a routerLink="/upload-broker-info" class="flex items-center gap-1">
//             <span>Become a Broker</span>
//           </a>
//           }
//           <button class="hover:underline">Find an Agent</button>
//           <button class="hover:underline">My Home</button>
//           <button class="hover:underline">News & Insights</button>

//           @if (auth.isAdmin()) {
//           <a routerLink="/admin" class="flex items-center gap-1"> Admin </a>
//           } @if (auth.isExpert()) {
//           <a routerLink="/broker" class="flex items-center gap-1">Broker</a>
//           }
//         </nav>
//       </div>

//       <!-- RIGHT SIDE -->
//       <div class="hidden md:flex items-center gap-4">
//         <!-- Moved to the right -->
//         <button routerLink="/manage-rentals" class="hover:underline">Manage rentals</button>
//         <button routerLink="/advertise" class="hover:underline">Advertise</button>
//         @if (!auth.isLoggedIn()) {
//         <button (click)="openAuth('sign-in')" class="text-sm hover:underline">Sign in</button>

//         <button
//           (click)="openAuth('sign-up')"
//           class="text-sm border border-white px-3 py-1 rounded bg-black text-white transition"
//         >
//           Sign up
//         </button>

//         } @if (auth.isLoggedIn()) {

//         <!-- Notifications -->
//         <a
//           routerLink="/notifications"
//           (click)="store.resetNCounter()"
//           class="relative flex items-center"
//         >
//           <lucide-icon [name]="bell" class="w-5 h-5"></lucide-icon>

//           @if (store.notificationCounter()) {
//           <div
//             class="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full w-3 h-3 flex items-center justify-center"
//           >
//             {{ store.notificationCounter() }}
//           </div>
//           }
//         </a>

//         <!-- Profile Menu -->
//         <div class="relative">
//           <button (click)="toggleDropdown()" class="flex items-center gap-2 pl-3">
//             <div
//               class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold uppercase"
//             >
//               {{ getInitial() }}
//             </div>
//           </button>

//           @if (dropdownOpen()) {
//           <div class="absolute right-0 mt-2 w-44 bg-gray-700 rounded-lg shadow-lg text-sm py-2">
//             <p class="px-4 pb-2 text-gray-300 border-b border-gray-600 text-xs">
//               {{ auth.userEmail() }}
//             </p>

//             <button (click)="go('bookmarks')" class="px-4 py-2 text-gray-200 hover:bg-gray-600">
//               <lucide-icon [name]="heart" class="w-5 h-5"></lucide-icon>
//               <span>saved homes</span>
//             </button>
//             <button (click)="go('settings')" class="px-4 py-2 text-gray-200 hover:bg-gray-600">
//               Settings
//             </button>
//             <button
//               (click)="logout()"
//               class="px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center gap-2"
//             >
//               <lucide-icon [name]="logOut" class="w-5 h-5"></lucide-icon>
//               Log out
//             </button>
//           </div>
//           }
//         </div>
//         }
//       </div>
//     </header>

//     @if (store.authModal()) {
//     <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-[99999]">
//       <div class="bg-white w-full max-w-sm p-4 rounded-lg relative">
//         <!-- Close button -->
//         <button (click)="closeAuth()" class="absolute right-3 top-3 text-gray-500 hover:text-black">
//           <lucide-icon [name]="x" class="w-6 h-6 rotate-90"></lucide-icon>
//         </button>

//         @if (authMode==='sign-in') {
//         <sign-in />
//         } @if (authMode === 'sign-up') {
//         <sign-up />
//         }
//       </div>
//     </div>
//     } @if (warningMessage) {
//     <p class="text-red-600 text-sm ml-2">{{ warningMessage }}</p>
//     }
//   `,
// })

// export class DesktopHeader extends BaseHeader {}
