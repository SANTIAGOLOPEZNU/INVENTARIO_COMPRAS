import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionMaterialesComponent } from './componentes/recepcion-materiales/recepcion-materiales.component';
import { DespachosMaterialesComponent } from './componentes/despachos-materiales/despachos-materiales.component';

const routes: Routes = [

  {path: 'recepcion_materiales', component: RecepcionMaterialesComponent},
  {path: 'despacho_materiales', component: DespachosMaterialesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
