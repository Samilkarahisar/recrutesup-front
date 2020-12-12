import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfilComponent } from './employee-profil.component';

describe('EmployeeProfilComponent', () => {
  let component: EmployeeProfilComponent;
  let fixture: ComponentFixture<EmployeeProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
