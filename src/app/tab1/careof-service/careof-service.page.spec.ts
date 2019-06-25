import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareofServicePage } from './careof-service.page';

describe('CareofServicePage', () => {
  let component: CareofServicePage;
  let fixture: ComponentFixture<CareofServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareofServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareofServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
