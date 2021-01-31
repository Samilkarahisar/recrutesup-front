import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationIndisponibleOfferDialogComponent } from './confirmation-indisponible-offer-dialog.component';

describe('ConfirmationIndisponibleOfferDialogComponent', () => {
  let component: ConfirmationIndisponibleOfferDialogComponent;
  let fixture: ComponentFixture<ConfirmationIndisponibleOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationIndisponibleOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationIndisponibleOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
