import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from '../inicio/pages/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    UsuariosComponent,
  ]
})
export class SeguridadModule { }
