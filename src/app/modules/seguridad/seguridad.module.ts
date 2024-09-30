import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from '../inicio/pages/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import { GrupousuariosComponent } from './componentes/grupousuarios/grupousuarios.component';
@NgModule({
  declarations: [
    UsuariosComponent,
    GrupousuariosComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
  ],
  exports: [
    UsuariosComponent,
    GrupousuariosComponent
  ]
})
export class SeguridadModule { }
