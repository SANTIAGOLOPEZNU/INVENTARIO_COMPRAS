import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupousuariosComponent } from './grupousuarios.component';

describe('GrupousuariosComponent', () => {
  let component: GrupousuariosComponent;
  let fixture: ComponentFixture<GrupousuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupousuariosComponent]
    });
    fixture = TestBed.createComponent(GrupousuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
