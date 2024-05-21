import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverViewGridComponent } from './over-view-grid.component';

describe('OverViewGridComponent', () => {
  let component: OverViewGridComponent;
  let fixture: ComponentFixture<OverViewGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverViewGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverViewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
