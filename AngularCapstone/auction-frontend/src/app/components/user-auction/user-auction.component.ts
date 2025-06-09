import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ For ngIf, date pipe
import { FormsModule } from '@angular/forms';   // ✅ For ngModel
import { AuthService } from '../../services/auth.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-user-auction',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Must be added
  templateUrl: './user-auction.component.html',
  styleUrls: ['./user-auction.component.scss']
})
export class UserAuctionComponent implements OnInit {
  auctions: any[] = [];
  bidAmounts: { [auctionId: number]: number } = {};

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions() {
    this.http.get<any[]>('http://localhost:5021/api/Auction').subscribe({
      next: (data) => {
        this.auctions = data;
      },
      error: (err) => {
        console.error('Error loading auctions:', err);
        alert('Failed to load auctions.');
      }
    });
  }

  placeBid(auctionId: number) {
    const bidAmount = this.bidAmounts[auctionId];
    const user = this.auth.getUserFromToken();
    const userId = user?.userId;

    if (!bidAmount || !userId) {
      alert('⚠ Please enter a valid bid amount and ensure you are logged in.');
      return;
    }

    const bidPayload = {
      auctionId: auctionId,
      userId: userId,
      bidAmount: bidAmount
    };

    this.http.post('http://localhost:5021/api/Bid', bidPayload).subscribe({
      next: () => {
        alert('✅ Bid placed successfully!');
        this.loadAuctions();
        this.bidAmounts[auctionId] = 0;
      },
      error: (err) => {
        console.error('Error placing bid:', err);
        alert('❌ Failed to place bid.');
      }
    });
  }

  async buyNow(auction: any) {
    const stripe = await loadStripe('pk_test_51RVWTmP7CwYglt5CNAqTBWWa7uhf75jdEvYU5SlEf6uhHHiHfFzfVpbydwRMymR7CEl8HbRL7ZUBgzE6p6MvmfaF00nMVyqVsL');

    this.http.post<any>('http://localhost:5021/api/Payment/create-checkout-session', {
      itemName: auction.title,
      amount: auction.startingPrice
    }).subscribe({
      next: async (res) => {
        if (res.url) {
          window.location.href = res.url;
        } else {
          alert('❌ Failed to redirect to payment.');
        }
      },
      error: (err) => {
        console.error('Error creating Stripe session:', err);
        alert('❌ Stripe payment failed.');
      }
    });
  }

  isAuctionLive(endTime: string): boolean {
    return new Date(endTime).getTime() > Date.now();
  }
}
