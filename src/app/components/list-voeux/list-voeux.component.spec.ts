import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoeuxComponent } from './list-voeux.component';

describe('ListVoeuxComponent', () => {
  let component: ListVoeuxComponent;
  let fixture: ComponentFixture<ListVoeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVoeuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVoeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
