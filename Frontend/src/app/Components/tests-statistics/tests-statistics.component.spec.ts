import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsStatisticsComponent } from './tests-statistics.component';

describe('TestsStatisticsComponent', () => {
  let component: TestsStatisticsComponent;
  let fixture: ComponentFixture<TestsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
