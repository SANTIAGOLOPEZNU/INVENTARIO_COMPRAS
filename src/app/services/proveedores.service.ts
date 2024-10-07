import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = 'http://localhost/api/Proveedores';

  constructor(private http: HttpClient) { }

  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recuperartodos.php`);
  }

  alta(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alta.php`, usuarioData);
  }

  modificar(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificacion.php`, usuario);
  }
}
