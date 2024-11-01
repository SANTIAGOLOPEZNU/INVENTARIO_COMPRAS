import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { InsumosComponent } from './componentes/insumos/insumos.component';
import { DestinatarioComponent } from './componentes/destinatario/destinatario.component';

const routes: Routes = [
  {path: 'proveedores', component:ProveedoresComponent},
  {path: 'insumos', component:InsumosComponent},
  {path: 'destinatario', component: DestinatarioComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
