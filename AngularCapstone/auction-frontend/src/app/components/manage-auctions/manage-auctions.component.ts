import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-auctions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.scss']
})
export class ManageAuctionsComponent implements OnInit {
  auctions: any[] = [];
  showForm = false;
editingAuctionId: number | null = null;

  newAuction: any = {
  title: '',
  description: '',
  startingPrice: null,
  startTime: '',
  endTime: '',
  imageBase64: '',
  createdById: 2  //  hardcode for now or get from token/session
};
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuctions();
  }

  fetchAuctions() {
    this.http.get<any[]>('http://localhost:5021/api/Auction').subscribe({
      next: (data) => this.auctions = data,
      error: (err) => console.error('Error fetching auctions', err)
    });
  }

  openCreateForm() {
    this.showForm = true;
  }

  cancelCreate() {
    this.showForm = false;
    this.newAuction = {
      title: '',
      description: '',
      startingPrice: null,
      startTime: '',
      endTime: '',
      imageBase64: ''
    };
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newAuction.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitAuction() {
    this.http.post('http://localhost:5021/api/Auction', this.newAuction).subscribe({
      next: () => {
        alert('✅ Auction created successfully!');
        this.cancelCreate();
        this.fetchAuctions();
      },
      error: (err) => {
        console.error('❌ Error creating auction', err);
        alert('Something went wrong. Check console for details.');
      }
    });
  }

  isAuctionLive(endTime: string): boolean {
    return new Date(endTime).getTime() > Date.now();
  }

 editAuction(auction: any) {
  this.newAuction = { ...auction }; // Pre-fill the form
  this.editingAuctionId = auction.AuctionId; // Track which auction is being edited
  this.showForm = true;
}

deleteAuction(id: number) {
  if (confirm('Are you sure you want to delete this auction?')) {
    this.http.delete(`http://localhost:5021/api/Auction/${id}`).subscribe({
      next: () => {
        alert('🗑 Auction deleted successfully!');
        this.fetchAuctions(); // Refresh the list
      },
      error: (err) => {
        console.error(' Error deleting auction', err);
        alert('Something went wrong. Check console for details.');
      }
    });
  }
}

}
