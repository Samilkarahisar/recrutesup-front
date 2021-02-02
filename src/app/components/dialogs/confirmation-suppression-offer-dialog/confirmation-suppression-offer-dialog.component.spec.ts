import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSuppressionOfferDialogComponent } from './confirmation-suppression-offer-dialog.component';

describe('ConfirmationSuppressionOfferDialogComponent', () => {
  let component: ConfirmationSuppressionOfferDialogComponent;
  let fixture: ComponentFixture<ConfirmationSuppressionOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationSuppressionOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSuppressionOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
