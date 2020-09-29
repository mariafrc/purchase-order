import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InChargeItemComponent } from './in-charge-item.component';

describe('InChargeItemComponent', () => {
  let component: InChargeItemComponent;
  let fixture: ComponentFixture<InChargeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InChargeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InChargeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
