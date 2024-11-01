import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl1 = 'http://localhost/api/Movimientos/recepcion';
 private apiUrl2= 'http://localhost/api/Movimientos/detalles'
 private apiUrl3= 'http://localhost/api/Movimientos/despachos'

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

  alta(ReciboData: any): Observable<any> {
    return this.http.post(`${this.apiUrl1}/alta.php`, ReciboData);
  }

  recuperar(): Observable<any> {

    
    return this.http.get(`${this.apiUrl1}/recuperartodos.php`);

  }

  // Nuevo método para modificar un usuario
  modificar(recibo: any): Observable<any> {
    return this.http.put(`${this.apiUrl1}/modificacion.php`, recibo);
  }


//Metodos para detalles
  altaDetail(DetailData: any, recibo: any): Observable<any> {


    const datos={
      usuarioData: DetailData,
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
  }



  altaDespacho(DespachoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl3}/alta.php`, DespachoData);
  }

  recuperarDespachos(): Observable<any> {
    return this.http.get(`${this.apiUrl3}/recuperartodos.php`);
  }

  // Nuevo método para modificar un usuario
  modificarDespacho(despacho: any): Observable<any> {
    return this.http.put(`${this.apiUrl3}/modificacion.php`, despacho);
  }

}
