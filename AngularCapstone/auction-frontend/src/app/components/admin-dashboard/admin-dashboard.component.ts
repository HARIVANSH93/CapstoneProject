import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    totalAuctions: 0,
    totalBids: 0,
    totalRevenue: 0
  };

  // You can use this flag if you want to show/hide dashboard or message dynamically later
  showDashboard = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats() {
    this.http.get<any>('http://localhost:5021/api/Admin/stats').subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('❌ Failed to load admin stats', err);
      }
    });
  }
}
