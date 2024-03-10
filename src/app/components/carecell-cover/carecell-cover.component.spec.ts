import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarecellCoverComponent } from './carecell-cover.component';

describe('CarecellCoverComponent', () => {
  let component: CarecellCoverComponent;
  let fixture: ComponentFixture<CarecellCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarecellCoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarecellCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
