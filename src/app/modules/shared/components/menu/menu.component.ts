import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private usuarioService: UsuariosService){}

  //desabilita el menu si el usuario no inicia sesion
  get isLoggedIn(): boolean {
    return this.usuarioService.isLoggedIn();
  }
  
}
