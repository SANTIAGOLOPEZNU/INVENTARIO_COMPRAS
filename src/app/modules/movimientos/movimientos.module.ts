import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { RecepcionMaterialesComponent } from './componentes/recepcion-materiales/recepcion-materiales.component';


@NgModule({
  declarations: [
    RecepcionMaterialesComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    ReactiveFormsModule 
  ]
})
export class MovimientosModule { }
