import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationInvalidationOfferDialogComponent } from './confirmation-invalidation-offer-dialog.component';

describe('ConfirmationInvalidationOfferDialogComponent', () => {
  let component: ConfirmationInvalidationOfferDialogComponent;
  let fixture: ComponentFixture<ConfirmationInvalidationOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationInvalidationOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationInvalidationOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
