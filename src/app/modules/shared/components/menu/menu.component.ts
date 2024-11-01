import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private usuarioService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    // Redirigir al login si el usuario no está autenticado
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  get isLoggedIn(): boolean {
    return this.usuarioService.isLoggedIn();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }
}
