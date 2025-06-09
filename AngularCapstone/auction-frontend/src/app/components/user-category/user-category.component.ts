import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.scss']
})
export class UserCategoryComponent implements OnInit {
  categories: any[] = [];
  private baseUrl = 'http://localhost:5021/api/Category';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('❌ Failed to load categories:', err);
      }
    });
  }
}
