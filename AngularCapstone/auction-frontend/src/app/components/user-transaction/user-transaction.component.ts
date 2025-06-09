import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.scss']
})
export class UserTransactionComponent implements OnInit {
  transactions: any[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getUserFromToken();
    const userId = user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    if (!userId) return;

    this.http.get(`http://localhost:5021/api/Transaction/user/${userId}`).subscribe({
      next: (res: any) => {
        this.transactions = res;
      },
      error: (err) => {
        console.error('❌ Error fetching transactions:', err);
      }
    });
  }
}
