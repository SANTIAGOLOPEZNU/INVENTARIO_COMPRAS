import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl1 = 'http://localhost/api/Movimientos/recepcion'
  private apiUrl2 = 'http://localhost/api/Movimientos/detalles'
  private apiUrl3 = 'http://localhost/api/Movimientos/despachos'
  private apiUrl4 = 'http://localhost/api/Movimientos/Ajustes'

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


  //Metodos para el alta de detalles en los diferentes movimientos
  altaDetail(DetailData: any, recibo: any): Observable<any> {
    const datos = {
      usuarioData: DetailData,
      recibo: recibo
    }
    return this.http.post(`${this.apiUrl2}/alta.php`, datos);
  }

  altaDetallesDespacho(DetailData: any, Despacho: any): Observable<any> {
    const datosDespacho = {
      DetailData: DetailData,
      Despacho: Despacho
    }
    return this.http.post(`${this.apiUrl2}/altadetallesdespachos.php`, datosDespacho);
  }

  altaDetallesAjuste(DetailData: any, ajuste: any){
    const datosAjuste = {
      DetailData: DetailData,
      ajuste: ajuste
    }
    return this.http.post(`${this.apiUrl2}/altadetallesajustes.php`, datosAjuste);
  }


  recuperarDetail(recibo: number): Observable<any> {
    console.log('este es el valor de array:', recibo)
    let params = new HttpParams().set('recibo', recibo.toString());
    console.log('este es el valor de array:', params)
    return this.http.get(`${this.apiUrl2}/recuperartodos.php`, { params });
  }

  RecuperarDetailDespacho(Despacho: number): Observable<any> {
    console.log('este es el valor de array:', Despacho)
    let params = new HttpParams().set('recibo', Despacho.toString());
    console.log('este es el valor de array:', params)
    return this.http.get(`${this.apiUrl2}/recuperardetallesdespachos.php`, { params });
  }

  RecuperarDetailAjuste(Ajuste: number): Observable<any>{
    console.log('este es el valor de array:', Ajuste)
    let params = new HttpParams().set('recibo', Ajuste.toString());
    console.log('este es el valor de array:', params)
    return this.http.get(`${this.apiUrl2}/recuperardetallesajustes.php`, { params });
  }

  // Nuevo método para modificar un usuario
  modificarDetail(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/modificacion.php`, usuario);
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


  //servicio de ajuste
  altaAJuste(AjusteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl4}/alta.php`, AjusteData);
  }
  recuperarAjuste(): Observable<any> {
    return this.http.get(`${this.apiUrl4}/recuperartodos.php`);
  }
  modificarAjuste(recibo: any): Observable<any> {
    return this.http.put(`${this.apiUrl4}/modificacion.php`, recibo);
  }

}
