import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationIndisponibleStudentDialogComponent } from './confirmation-indisponible-student-dialog.component';

describe('ConfirmationIndisponibleStudentDialogComponent', () => {
  let component: ConfirmationIndisponibleStudentDialogComponent;
  let fixture: ComponentFixture<ConfirmationIndisponibleStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationIndisponibleStudentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationIndisponibleStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
