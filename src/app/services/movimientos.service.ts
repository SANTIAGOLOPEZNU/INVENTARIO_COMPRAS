import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl1 = 'http://localhost/api/Movimientos/recepcion';
 private apiUrl2= 'http://localhost/api/Movimientos/detalles'

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
    return this.http.post(`${this.apiUrl1}/alta.php`, usuarioData);
  }

  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/recuperartodos.php`);
  }

  // Nuevo método para modificar un usuario
  modificar(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl1}/modificacion.php`, usuario);
  }


//Metodos para detalles
  altaDetail(usuarioData: any, numerorecibo: number): Observable<any> {
 
    const datos = {
      datos: usuarioData,
      numrecibo: numerorecibo
    }
console.log(usuarioData)
    alert(numerorecibo)
    return this.http.post(`${this.apiUrl2}/alta.php`, datos);
    headers: {
      'Content-Type'; 
      'application/json'  // Asegúrate de que este header esté presente
  }
  }

  recuperarDetail(): Observable<any> {
    return this.http.get(`${this.apiUrl2}/recuperartodos.php`);
  }

  // Nuevo método para modificar un usuario
  modificarDetail(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/modificacion.php`, usuario);
  }

  inicioSesion(mail: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl1}/login.php`, { mail, clave });
  }}
