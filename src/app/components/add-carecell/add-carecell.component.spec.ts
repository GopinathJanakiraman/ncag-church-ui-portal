import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarecellComponent } from './add-carecell.component';

describe('AddCarecellComponent', () => {
  let component: AddCarecellComponent;
  let fixture: ComponentFixture<AddCarecellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarecellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCarecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
