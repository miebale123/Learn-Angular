// import { Injectable, signal } from '@angular/core';
// import { Component, inject, OnInit } from '@angular/core';
// import { DatePipe } from '@angular/common';
// import { firstValueFrom } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environments';

// @Injectable({ providedIn: 'root' })
// export class PushService {
//   http = inject(HttpClient);
//   private readonly VAPID_PUBLIC_KEY =
//     'BIxIvvpcFhnBrsAJiQ2mKU6j5E4v6KUEBLmpvO9YfKbDRoUXFvOk5OOBx_51k-MKLLG1iT0ZOMtz2PfGFxNtkkw';
//   public notifications = signal<{ title: string; body: string; icon: string; timestamp: Date }[]>(
//     []
//   );

//   async subscribe() {
//     try {
//       const subscription = await navigator.serviceWorker.register('/ngsw-worker.js').then((sw) =>
//         sw.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
//         })
//       );
//       console.log('subscription success', subscription);
//     } catch (err) {
//       console.error('subscription failed', err);
//     }
//   }

//   async fetchNotifications() {
//     const res = await fetch('http://localhost:4442/push/log');
//     const list = await res.json();

//     // Ensure it's always an array of the exact expected shape
//     const normalized = Array.isArray(list)
//       ? list.map((x) => ({
//           title: x.title,
//           body: x.body,
//           icon: x.icon,
//           timestamp: new Date(x.timestamp),
//         }))
//       : [];

//     this.notifications.set(normalized);
//   }

//   private urlBase64ToUint8Array(base64String: string) {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
//     const rawData = atob(base64);
//     return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
//   }

//   async sendNotification() {
//     const res: any = await firstValueFrom(
//       this.http.post(`${environment.apiBaseUrl}/push/send`, {
//         title: '',
//         message: 'wow',
//         icon: 'myicon',
//       })
//     );

//     console.log('the send notification response is: ', res);
//   }
// }

// @Component({
//   selector: 'app-push',
//   imports: [DatePipe],
//   template: `
//     <div class="flex flex-col">
//       <button (click)="subscribe()">Enable Notifications</button>
//       <button (click)="refreshLog()">Refresh Notifications</button>

//       <div class="notification-log">
//         @for (n of push.notifications() ; track $index) {
//         <img [src]="n.icon" width="40" height="40" />
//         <strong>{{ n.title }}</strong>
//         <p>{{ n.body }}</p>
//         <small>{{ n.timestamp | date : 'short' }}</small>
//         <hr />
//         }
//       </div>

//       <div>
//         <button (click)="sendNotification()">send notification</button>
//       </div>
//     </div>
//   `,
//   styles: [
//     `
//       .notification-log {
//         max-width: 400px;
//         margin-top: 20px;
//       }
//       .notification-log div {
//         display: flex;
//         gap: 10px;
//         align-items: center;
//       }
//       .notification-log img {
//         border-radius: 50%;
//       }
//     `,
//   ],
// })
// export class PushComponent implements OnInit {
//   push = inject(PushService);

//   ngOnInit() {
//     this.refreshLog();

//     // Optional: listen to incoming push in Service Worker
//     navigator.serviceWorker.addEventListener('message', (event) => {
//       console.log('Push received:', event.data);
//     });
//   }

//   subscribe() {
//     this.push.subscribe();
//   }

//   refreshLog() {
//     this.push.fetchNotifications();
//   }

//   sendNotification() {
//     this.push.sendNotification();
//   }
// }
