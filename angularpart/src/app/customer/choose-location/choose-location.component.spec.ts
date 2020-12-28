import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLocationComponent } from './choose-location.component';

describe('ChooseLocationComponent', () => {
  let component: ChooseLocationComponent;
  let fixture: ComponentFixture<ChooseLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
