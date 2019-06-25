import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernPage } from './concern.page';

describe('ConcernPage', () => {
  let component: ConcernPage;
  let fixture: ComponentFixture<ConcernPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcernPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
