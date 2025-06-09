import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-auction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-auction-list.component.html',
  styleUrls: ['./user-auction-list.component.scss']
})
export class UserAuctionListComponent implements OnInit {
  auctions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5021/api/Auction')
      .subscribe({
        next: (res) => this.auctions = res,
        error: (err) => console.error('Failed to fetch auctions', err)
      });
  }
}
