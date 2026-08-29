import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';


interface NotificationItem {

  id: number;

  title: string;

  description: string;

  time: string;

  read: boolean;

  type:
    | 'security'
    | 'billing'
    | 'system'
    | 'user';

  icon: string;
}


@Component({
  selector: 'app-notifications',

  templateUrl: './notifications.component.html',

  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  @Output()
  close = new EventEmitter<void>();


  notifications: NotificationItem[] = [

    {
      id: 1,

      title: 'GitHub Milestone 🚀',

      description:
        'Nexora repository crossed 250 stars and 45 forks on GitHub.',

      time: '12m ago',

      read: false,

      type: 'system',

      icon: 'fa-star'
    },


    {
      id: 2,

      title: 'Pull Request Approved',

      description:
        'Core contributor reviewed and merged the responsive navbar updates.',

      time: '45m ago',

      read: false,

      type: 'user',

      icon: 'fa-code-pull-request'
    },


    {
      id: 3,

      title: 'Build Successfully Compiled',

      description:
        'Angular enterprise template components built with zero errors.',

      time: '2h ago',

      read: true,

      type: 'system',

      icon: 'fa-circle-check'
    },


    {
      id: 4,

      title: 'Security Compliance Check',

      description:
        'Audit logs and reactive form validation modules verified by Suvam Biswas.',

      time: '5h ago',

      read: true,

      type: 'security',

      icon: 'fa-shield-halved'
    }

  ];


  get unreadCount(): number {

    return this.notifications.filter(
      notification => !notification.read
    ).length;

  }


  markAllAsRead(): void {

    this.notifications.forEach(notification => {

      notification.read = true;

    });

  }


  markAsRead(
    notification: NotificationItem,
    event: MouseEvent
  ): void {

    event.stopPropagation();

    notification.read = true;

  }


  onClose(): void {

    this.close.emit();

  }

}