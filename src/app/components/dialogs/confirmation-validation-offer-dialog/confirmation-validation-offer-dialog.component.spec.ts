import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationValidationOfferDialogComponent } from './confirmation-validation-offer-dialog.component';

describe('ConfirmationValidationOfferDialogComponent', () => {
  let component: ConfirmationValidationOfferDialogComponent;
  let fixture: ComponentFixture<ConfirmationValidationOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationValidationOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationValidationOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
