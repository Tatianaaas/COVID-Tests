import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserDetailsComponent } from './test-user-details.component';

describe('TestUserDetailsComponent', () => {
  let component: TestUserDetailsComponent;
  let fixture: ComponentFixture<TestUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
