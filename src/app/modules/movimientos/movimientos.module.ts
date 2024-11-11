import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { RecepcionMaterialesComponent } from './componentes/recepcion-materiales/recepcion-materiales.component';
import { DespachosMaterialesComponent } from './componentes/despachos-materiales/despachos-materiales.component';
import { MatIconModule } from '@angular/material/icon';
import { AjustesMaterialesComponent } from './componentes/ajustes-materiales/ajustes-materiales.component';

@NgModule({
  declarations: [
    RecepcionMaterialesComponent,
    DespachosMaterialesComponent,
    AjustesMaterialesComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    ReactiveFormsModule, 
    MatIconModule
  ]
})
export class MovimientosModule { }
