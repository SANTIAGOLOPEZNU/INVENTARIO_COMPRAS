import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';

//Angular Components
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
   MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterModule]
})
export class InicioModule { }
