import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokacijeComponent } from './lokacije.component';

describe('LokacijeComponent', () => {
  let component: LokacijeComponent;
  let fixture: ComponentFixture<LokacijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokacijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
