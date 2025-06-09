import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuctionListComponent } from './user-auction-list.component';

describe('UserAuctionListComponent', () => {
  let component: UserAuctionListComponent;
  let fixture: ComponentFixture<UserAuctionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuctionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuctionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
