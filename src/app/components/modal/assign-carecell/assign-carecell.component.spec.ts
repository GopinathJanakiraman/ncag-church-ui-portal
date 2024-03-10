import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCarecellComponent } from './assign-carecell.component';

describe('AssignCarecellComponent', () => {
  let component: AssignCarecellComponent;
  let fixture: ComponentFixture<AssignCarecellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCarecellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignCarecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
