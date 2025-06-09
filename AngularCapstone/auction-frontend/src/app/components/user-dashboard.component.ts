import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserAuctionComponent } from './user-auction/user-auction.component'; 

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, UserAuctionComponent], 
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  user: any = null;
bids: any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken();
    if (!this.user) {
      this.router.navigate(['/user/login']);
    }
  }

  logout() {
    this.auth.logout();
  }
}
