import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AutentificacionModule { }
