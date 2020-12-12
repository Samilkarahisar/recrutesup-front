import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfilComponent } from './admin-profil.component';

describe('AdminProfilComponent', () => {
  let component: AdminProfilComponent;
  let fixture: ComponentFixture<AdminProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
