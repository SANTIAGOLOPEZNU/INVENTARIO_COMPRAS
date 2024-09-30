import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';
import { LoginComponent } from './modules/autentificacion/login/login.component';

const routes: Routes = [
  //ruta prerdeterminada que inicializa el componente inicio al ejecutar el programa 
  { path: '', component: LoginComponent},
  //Cargas perezosas de los modulos 
  { path: '', loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule) },
  { path: '', loadChildren: () => import('./modules/parametros/parametros.module').then(m => m.ParametrosModule) },
  { path: '', loadChildren: () => import('./modules/movimientos/movimientos.module').then(m => m.MovimientosModule)},
  { path: '', loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m => m.AutentificacionModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
