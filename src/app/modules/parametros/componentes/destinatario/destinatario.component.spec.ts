import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatarioComponent } from './destinatario.component';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinatarioComponent]
    });
    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
