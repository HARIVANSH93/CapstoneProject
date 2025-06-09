import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-bids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bids.component.html',
  styleUrls: ['./manage-bids.component.scss']
})
export class ManageBidsComponent implements OnInit {
  bids: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBids();
  }

  fetchBids(): void {
    this.http.get<any[]>('http://localhost:5021/api/Bid').subscribe({
      next: (data) => (this.bids = data),
      error: (err) => console.error('Error fetching bids:', err)
    });
  }
}
