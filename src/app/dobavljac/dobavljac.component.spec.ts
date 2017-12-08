import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DobavljacComponent } from './dobavljac.component';

describe('DobavljacComponent', () => {
  let component: DobavljacComponent;
  let fixture: ComponentFixture<DobavljacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DobavljacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DobavljacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
