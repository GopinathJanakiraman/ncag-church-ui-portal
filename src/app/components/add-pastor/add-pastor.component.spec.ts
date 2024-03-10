import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPastorComponent } from './add-pastor.component';

describe('AddPastorComponent', () => {
  let component: AddPastorComponent;
  let fixture: ComponentFixture<AddPastorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPastorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPastorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
