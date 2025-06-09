import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getUserFromToken();
    const userId = user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    if (!userId) return;

    this.http.get(`http://localhost:5021/api/Notification/user/${userId}`).subscribe({
      next: (res: any) => {
        this.notifications = res;
      },
      error: (err) => {
        console.error('❌ Error fetching notifications', err);
      }
    });
  }
}
