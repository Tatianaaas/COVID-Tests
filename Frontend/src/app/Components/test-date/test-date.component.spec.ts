import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDateComponent } from './test-date.component';

describe('TestDateComponent', () => {
  let component: TestDateComponent;
  let fixture: ComponentFixture<TestDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
