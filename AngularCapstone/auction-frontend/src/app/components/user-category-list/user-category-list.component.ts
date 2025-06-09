import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-category-list.component.html',
  styleUrls: ['./user-category-list.component.scss']
})
export class UserCategoryListComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5021/api/Category')
      .subscribe({
        next: (res) => this.categories = res,
        error: (err) => console.error('Failed to fetch categories', err)
      });
  }
}
