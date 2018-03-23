import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalInputComponent } from './artikal-input.component';

describe('ArtikalInputComponent', () => {
  let component: ArtikalInputComponent;
  let fixture: ComponentFixture<ArtikalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtikalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
