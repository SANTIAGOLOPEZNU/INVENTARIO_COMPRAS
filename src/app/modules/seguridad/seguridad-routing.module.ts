import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { GrupousuariosComponent } from './componentes/grupousuarios/grupousuarios.component';

const routes: Routes = [
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'grupousuarios', component:GrupousuariosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
