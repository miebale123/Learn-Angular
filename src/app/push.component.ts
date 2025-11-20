import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

interface NotificationItem {
  title: string;
  body: string;
  icon: string;
  timestamp: Date;
}

@Component({
  selector: 'app-push',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="flex flex-col gap-2">
      <button (click)="subscribe()">Enable Notifications</button>
      <button (click)="fetchNotifications()">Refresh Notifications</button>
      <button (click)="sendTest()">Send Test Notification</button>

      <div class="notification-log" *ngIf="notifications().length">
        @for (n of notifications(); track $index) {
        <img [src]="n.icon" width="40" height="40" />
        <strong>{{ n.title }}</strong>
        <p>{{ n.body }}</p>
        <small>{{ n.timestamp | date : 'short' }}</small>
        <hr />
        }
      </div>
    </div>
  `,
  styles: [
    `
      .notification-log {
        max-width: 400px;
        margin-top: 20px;
      }
      .notification-log img {
        border-radius: 50%;
        margin-right: 8px;
      }
    `,
  ],
})
export class PushComponent implements OnInit {
  private http = inject(HttpClient);

  notifications = signal<NotificationItem[]>([]);

  private readonly VAPID_PUBLIC_KEY =
    'BIxIvvpcFhnBrsAJiQ2mKU6j5E4v6KUEBLmpvO9YfKbDRoUXFvOk5OOBx_51k-MKLLG1iT0ZOMtz2PfGFxNtkkw';

  ngOnInit() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Push received via SW:', event.data);
      });
    }

    // optional: fetch notifications immediately on load
    this.fetchNotifications();
  }

  async testReg() {
    const registration = await navigator.serviceWorker.register('/ngsw-worker.js');
    console.log('SW registered immediately:', registration);
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
  }

  private async getServiceWorkerRegistration() {
    if (!('serviceWorker' in navigator)) return null;
    return navigator.serviceWorker.ready;
  }

  async subscribe() {
    const registration = await this.getServiceWorkerRegistration();
    if (!registration) return;
    console.log('registered');
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
      });

      await firstValueFrom(
        this.http.post(`${environment.apiBaseUrl}/push/subscribe`, { subscription })
      );

      console.log('Subscribed successfully:', subscription);
    } catch (err) {
      console.error('Push subscription failed', err);
    }
  }

  async fetchNotifications() {
    try {
      const res = await firstValueFrom(
        this.http.get<NotificationItem[]>(`${environment.apiBaseUrl}/push/log`)
      );

      // normalize timestamps
      this.notifications.set((res || []).map((n) => ({ ...n, timestamp: new Date(n.timestamp) })));
    } catch (err) {
      console.error('Failed to fetch notifications', err);
      this.notifications.set([]);
    }
  }

  async sendTest() {
    try {
      await firstValueFrom(
        this.http.post(`${environment.apiBaseUrl}/push/send`, {
          title: 'Test Notification',
          message: 'This is a test',
        })
      );
    } catch (err) {
      console.error('Failed to send test notification', err);
    }
  }
}
