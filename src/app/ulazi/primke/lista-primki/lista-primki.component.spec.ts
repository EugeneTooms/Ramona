import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrimkiComponent } from './lista-primki.component';

describe('ListaPrimkiComponent', () => {
  let component: ListaPrimkiComponent;
  let fixture: ComponentFixture<ListaPrimkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrimkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrimkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
