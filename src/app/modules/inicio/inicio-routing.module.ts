import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from '../seguridad/componentes/usuarios/usuarios.component';

const routes: Routes = [

   {path: '', component: InicioComponent},
   {path: 'inicio', component: InicioComponent},
   {path: 'usuarios', component: UsuariosComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
