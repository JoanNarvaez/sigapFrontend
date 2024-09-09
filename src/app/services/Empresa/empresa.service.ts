import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../../empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

//   private baseURL = "http://localhost:8080/empresa";

//   constructor(private httpClient: HttpClient) { }

//   // Obtener lista de empresas
//   obtenerListaDeEmpresas(): Observable<Empresa[]> {
//     return this.httpClient.get<Empresa[]>(`${this.baseURL}/consultar-todos`);
//   }

//   // Registrar empresa
//   registrarEmpresa(empresa: Empresa): Observable<Object> {
//     return this.httpClient.post(`${this.baseURL}/registrar`, empresa);
//   }

//   // Actualizar empresa
//   actualizarEmpresa(id: number, empresa: Empresa): Observable<Object> {
//     return this.httpClient.put(`${this.baseURL}/actualizar/${id}`, empresa);
//   }

//   // Obtener empresa por ID
//   obtenerEmpresaPorId(id: number): Observable<Empresa> {
//     return this.httpClient.get<Empresa>(`${this.baseURL}/consultar-por-id/${id}`);
//   }

//   // Eliminar empresa
//   eliminarEmpresa(id: number): Observable<Object> {
//     return this.httpClient.delete(`${this.baseURL}/eliminar/${id}`);
//   }
// }
private apiUrl = 'http://localhost:8080/empresa'; // Ajusta esto a la URL de tu backend

constructor(private http: HttpClient) { }

obtenerEmpresa(): Observable<any> {
  return this.http.get(`${this.apiUrl}/consultar-por-id/1`); // Asumimos que la única empresa siempre tendrá ID 1
}

guardarEmpresa(empresa: any): Observable<any> {
  if (empresa.id) {
    return this.http.put(`${this.apiUrl}/actualizar`, empresa);
  } else {
    return this.http.post(`${this.apiUrl}/registrar`, empresa);
  }
}
}