import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarecellListComponent } from './carecell-list.component';

describe('CarecellListComponent', () => {
  let component: CarecellListComponent;
  let fixture: ComponentFixture<CarecellListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarecellListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarecellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
