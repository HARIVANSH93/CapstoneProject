import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Auction {
  auctionId: number;
  title: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  startTime: string;
  endTime: string;
  categoryId?: number;
  createdBy: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private baseUrl = 'http://localhost:5021/api/Auction';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.baseUrl);
  }

  getById(id: number): Observable<Auction> {
    return this.http.get<Auction>(`${this.baseUrl}/${id}`);
  }

  create(auction: Partial<Auction>): Observable<Auction> {
    return this.http.post<Auction>(this.baseUrl, auction);
  }

  update(id: number, auction: Partial<Auction>): Observable<Auction> {
    return this.http.put<Auction>(`${this.baseUrl}/${id}`, auction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
