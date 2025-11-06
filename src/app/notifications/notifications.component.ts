import { Component } from '@angular/core';
import { NotificationService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="p-4 w-80 bg-gray-800 text-white rounded-2xl">
      <h2 class="text-lg mb-3 font-semibold">Notifications</h2>
      @if (notifications.length) {
        <ul>
          @for (note of notifications; track note) {
            <li class="mb-2 bg-gray-700 p-2 rounded">{{ note.message }}</li>
          }
        </ul>
      } @else {
        <p class="text-gray-400">No notifications yet.</p>
      }
    </div>
  `,
})
export class NotificationsComponent {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe((notes) => {
      this.notifications = notes;
    });
  }
}
