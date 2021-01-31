import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModifOfferDialogComponent } from './confirmation-modif-offer-dialog.component';

describe('ConfirmationModifOfferDialogComponent', () => {
  let component: ConfirmationModifOfferDialogComponent;
  let fixture: ComponentFixture<ConfirmationModifOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationModifOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModifOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
