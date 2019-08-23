import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePartyComponent } from './manage-party.component';

describe('ManagePartyComponent', () => {
  let component: ManagePartyComponent;
  let fixture: ComponentFixture<ManagePartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
