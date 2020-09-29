import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InChargeComponent } from './in-charge.component';

describe('InChargeComponent', () => {
  let component: InChargeComponent;
  let fixture: ComponentFixture<InChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
