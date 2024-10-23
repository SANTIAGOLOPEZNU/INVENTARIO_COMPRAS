import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  altaDetail(usuarioData: any, recibo: any): Observable<any> {


    const datos={
      usuarioData: usuarioData,
      recibo: recibo
    }
    return this.http.post(`${this.apiUrl2}/alta.php`, datos);
  }

  recuperarDetail(recibo: number ): Observable<any> {

    console.log('este es el valor de array:', recibo)
    let params = new HttpParams().set('recibo', recibo.toString());

    console.log('este es el valor de array:', params)

    return this.http.get(`${this.apiUrl2}/recuperartodos.php`, {params});
  }

  // Nuevo método para modificar un usuario
  modificarDetail(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/modificacion.php`, usuario);
  }

  inicioSesion(mail: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl1}/login.php`, { mail, clave });
  }}
