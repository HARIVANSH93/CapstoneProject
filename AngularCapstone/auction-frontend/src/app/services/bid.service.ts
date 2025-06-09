import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BidService {
  private baseUrl = 'http://localhost:5021/api/Bid';

  constructor(private http: HttpClient) {}

  getAllBids() {
    return this.http.get(`${this.baseUrl}`);
  }

  getBidById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBid(bidData: any) {
    return this.http.post(`${this.baseUrl}`, bidData);
  }

  deleteBid(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
