import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-bid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-bid.component.html',
  styleUrls: ['./user-bid.component.scss']
})
export class UserBidComponent implements OnInit {
  bids: any[] = [];
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBids();
  }

  fetchBids() {
    this.http.get<any[]>('http://localhost:5021/api/Bid').subscribe({
      next: (res) => {
        this.bids = res;
      },
      error: (err) => {
        this.error = '⚠️ Failed to load bids.';
        console.error(err);
      }
    });
  }
}
