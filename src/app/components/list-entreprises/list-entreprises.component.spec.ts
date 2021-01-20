import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntreprisesComponent } from './list-entreprises.component';

describe('ListEntreprisesComponent', () => {
  let component: ListEntreprisesComponent;
  let fixture: ComponentFixture<ListEntreprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEntreprisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
