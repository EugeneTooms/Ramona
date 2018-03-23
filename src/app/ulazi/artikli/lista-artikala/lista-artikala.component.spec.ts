import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArtikalaComponent } from './lista-artikala.component';

describe('ListaArtikalaComponent', () => {
  let component: ListaArtikalaComponent;
  let fixture: ComponentFixture<ListaArtikalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaArtikalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArtikalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
