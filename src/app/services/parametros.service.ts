import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private apiUrl = 'http://localhost/api/Parametros';
  constructor(private http: HttpClient) { }
  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recuperartodos.php`);
  }
  alta(DestinatarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alta.php`, DestinatarioData);
  }
  modificar(Destinatario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificacion.php`, Destinatario);
  }
}