import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventuraComponent } from './inventura.component';

describe('InventuraComponent', () => {
  let component: InventuraComponent;
  let fixture: ComponentFixture<InventuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
