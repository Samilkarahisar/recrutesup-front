import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfilComponent } from './company-profil.component';

describe('CompanyProfilComponent', () => {
  let component: CompanyProfilComponent;
  let fixture: ComponentFixture<CompanyProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
