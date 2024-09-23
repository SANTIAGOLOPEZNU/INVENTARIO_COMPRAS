import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

const routes: Routes = [
  //ruta prerdeterminada que inicializa el componente inicio al ejecutar el programa 
  { path: '', component: InicioComponent},
  //Cargas perezosas de los modulos 
  { path: '', loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule) },
  { path: '', loadChildren: () => import('./modules/parametros/parametros.module').then(m => m.ParametrosModule) },
  { path: '', loadChildren: () => import('./modules/movimientos/movimientos.module').then(m => m.MovimientosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
