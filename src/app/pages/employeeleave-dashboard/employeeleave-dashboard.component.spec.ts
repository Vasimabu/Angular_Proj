import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeleaveDashboardComponent } from './employeeleave-dashboard.component';

describe('EmployeeleaveDashboardComponent', () => {
  let component: EmployeeleaveDashboardComponent;
  let fixture: ComponentFixture<EmployeeleaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeleaveDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeleaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
