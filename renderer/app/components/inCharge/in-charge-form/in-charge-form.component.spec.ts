import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InChargeFormComponent } from './in-charge-form.component';

describe('InChargeFormComponent', () => {
  let component: InChargeFormComponent;
  let fixture: ComponentFixture<InChargeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InChargeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InChargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
