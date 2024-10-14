import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionMaterialesComponent } from './componentes/recepcion-materiales/recepcion-materiales.component';

const routes: Routes = [

  {path: 'recepcion_materiales', component: RecepcionMaterialesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
