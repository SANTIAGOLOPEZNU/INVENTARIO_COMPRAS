import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionMaterialesComponent } from './recepcion-materiales.component';

describe('RecepcionMaterialesComponent', () => {
  let component: RecepcionMaterialesComponent;
  let fixture: ComponentFixture<RecepcionMaterialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionMaterialesComponent]
    });
    fixture = TestBed.createComponent(RecepcionMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
