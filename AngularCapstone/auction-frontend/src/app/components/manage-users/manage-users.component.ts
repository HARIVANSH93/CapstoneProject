import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:5021/api/User').subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.error('❌ Failed to fetch users', err)
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:5021/api/User/${id}`).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('❌ Failed to delete user', err)
      });
    }
  }
}
