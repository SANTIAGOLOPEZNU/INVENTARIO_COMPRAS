import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { InsumosComponent } from './componentes/insumos/insumos.component';

const routes: Routes = [
  {path: 'proveedores', component:ProveedoresComponent},
  {path: 'insumos', component:InsumosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
