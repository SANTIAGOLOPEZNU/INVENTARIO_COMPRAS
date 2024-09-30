import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupousuariosComponent } from '../modules/seguridad/componentes/grupousuarios/grupousuarios.component';

@Injectable({
  providedIn: 'root'
})
export class GrupousuariosService {

  private apiUrl = 'http://localhost/api/GrupoUsuarios';

  private roles: any []=[];

  setArray(data: any[]){
    this.roles=data;
  }

  getArray(): any[] {
    return this.roles
  }

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
