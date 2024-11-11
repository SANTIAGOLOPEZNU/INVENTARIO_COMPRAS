import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionMaterialesComponent } from './componentes/recepcion-materiales/recepcion-materiales.component';
import { DespachosMaterialesComponent } from './componentes/despachos-materiales/despachos-materiales.component';
import { AjustesMaterialesComponent } from './componentes/ajustes-materiales/ajustes-materiales.component';

const routes: Routes = [

  {path: 'recepcion_materiales', component: RecepcionMaterialesComponent},
  {path: 'despacho_materiales', component: DespachosMaterialesComponent},
  {path: 'ajustes-materiales', component:AjustesMaterialesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
