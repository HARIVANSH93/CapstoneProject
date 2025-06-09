import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuctionComponent } from './user-auction.component';

describe('UserAuctionComponent', () => {
  let component: UserAuctionComponent;
  let fixture: ComponentFixture<UserAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
