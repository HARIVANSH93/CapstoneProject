import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss']
})
export class ManageTransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.http.get<any[]>('http://localhost:5021/api/Transaction').subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error('❌ Failed to fetch transactions', err)
    });
  }
}
