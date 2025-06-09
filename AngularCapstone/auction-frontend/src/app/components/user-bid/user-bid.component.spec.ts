import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBidComponent } from './user-bid.component';

describe('UserBidComponent', () => {
  let component: UserBidComponent;
  let fixture: ComponentFixture<UserBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
