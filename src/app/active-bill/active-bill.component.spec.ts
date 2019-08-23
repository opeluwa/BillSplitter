import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBillComponent } from './active-bill.component';

describe('ActiveBillComponent', () => {
  let component: ActiveBillComponent;
  let fixture: ComponentFixture<ActiveBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
