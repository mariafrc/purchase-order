import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormFocusComponent } from './order-form-focus.component';

describe('OrderFormFocusComponent', () => {
  let component: OrderFormFocusComponent;
  let fixture: ComponentFixture<OrderFormFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFormFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
