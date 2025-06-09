import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-notifications.component.html',
  styleUrls: ['./manage-notifications.component.scss']
})
export class ManageNotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.http.get<any[]>('http://localhost:5021/api/Notification').subscribe({
      next: (res) => (this.notifications = res),
      error: (err) => console.error('❌ Failed to fetch notifications', err)
    });
  }
}
