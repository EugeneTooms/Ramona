import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPrimkaComponent } from './nova-primka.component';

describe('NovaPrimkaComponent', () => {
  let component: NovaPrimkaComponent;
  let fixture: ComponentFixture<NovaPrimkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaPrimkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaPrimkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
