import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffresComponent } from './list-offres.component';

describe('ListOffresComponent', () => {
  let component: ListOffresComponent;
  let fixture: ComponentFixture<ListOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
