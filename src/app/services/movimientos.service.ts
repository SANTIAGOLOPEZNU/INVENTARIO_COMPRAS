import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl = 'http://localhost/api/Movimientos';

  //comprobar si se logueo
  private isLoggedInStatus = false;
  login() {
    this.isLoggedInStatus = true; 
  }
  logout() {
    this.isLoggedInStatus = false;
  }
  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  constructor(private http: HttpClient) { }

  alta(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alta.php`, usuarioData);
  }

  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recuperartodos.php`);
  }

  // Nuevo método para modificar un usuario
  modificar(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificacion.php`, usuario);
  }

  inicioSesion(mail: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { mail, clave });
  }}
