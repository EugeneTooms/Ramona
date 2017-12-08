import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimkeComponent } from './primke.component';

describe('PrimkeComponent', () => {
  let component: PrimkeComponent;
  let fixture: ComponentFixture<PrimkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
