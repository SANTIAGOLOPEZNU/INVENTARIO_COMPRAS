import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private apiUrl = 'http://localhost/api/Insumos';

  constructor(private http: HttpClient) { }

  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recuperartodos.php`);
  }

  alta(InsumosData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alta.php`, InsumosData);
  }

  modificar(Insumo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificacion.php`, Insumo);
  }
}
