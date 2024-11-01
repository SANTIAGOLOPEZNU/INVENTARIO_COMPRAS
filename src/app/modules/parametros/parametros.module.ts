import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InsumosComponent } from './componentes/insumos/insumos.component';
import { DestinatarioComponent } from './componentes/destinatario/destinatario.component';

@NgModule({
  declarations: [
    ProveedoresComponent,
    InsumosComponent,
    DestinatarioComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ParametrosModule { }
