import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachosMaterialesComponent } from './despachos-materiales.component';

describe('DespachosMaterialesComponent', () => {
  let component: DespachosMaterialesComponent;
  let fixture: ComponentFixture<DespachosMaterialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespachosMaterialesComponent]
    });
    fixture = TestBed.createComponent(DespachosMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
