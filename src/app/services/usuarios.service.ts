import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost/api-lunes';

  constructor(private http: HttpClient) { }

  alta(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alta.php`, usuarioData);
  }

  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recuperartodos.php`);
  }

  baja(IdUsuarios: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/baja.php?IdUsuarios=${IdUsuarios}`);
  }
 
  // Nuevo método para modificar un usuario
  modificar(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificacion.php`, usuario);
  }
}
