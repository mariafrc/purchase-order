import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormArticlesComponent } from './order-form-articles.component';

describe('OrderFormArticlesComponent', () => {
  let component: OrderFormArticlesComponent;
  let fixture: ComponentFixture<OrderFormArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFormArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
