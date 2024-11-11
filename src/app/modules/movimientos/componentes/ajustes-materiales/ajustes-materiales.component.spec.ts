import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesMaterialesComponent } from './ajustes-materiales.component';

describe('AjustesMaterialesComponent', () => {
  let component: AjustesMaterialesComponent;
  let fixture: ComponentFixture<AjustesMaterialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjustesMaterialesComponent]
    });
    fixture = TestBed.createComponent(AjustesMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
