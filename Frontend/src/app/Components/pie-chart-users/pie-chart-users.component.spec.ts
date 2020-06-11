import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartUsersComponent } from './pie-chart-users.component';

describe('PieChartUsersComponent', () => {
  let component: PieChartUsersComponent;
  let fixture: ComponentFixture<PieChartUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
