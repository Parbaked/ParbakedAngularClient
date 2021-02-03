import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDashboardComponent } from './dynamic-dashboard.component';

describe('DynamicDashboardComponent', () => {
  let component: DynamicDashboardComponent;
  let fixture: ComponentFixture<DynamicDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
