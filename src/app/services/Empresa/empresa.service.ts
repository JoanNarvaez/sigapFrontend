import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
private http =inject(HttpClient);



create(afiliado: Empresa){
return this.http.post<Empresa>('http://localhost:8080/empresa/registrar',afiliado);
// return this.http.post<Afiliado>('afiliado/registrar',afiliado)
}

update(id: number, afiliado: Empresa){
    return this.http.put<Empresa>(`http://localhost:8080/empresa/actualizar/${id}`,afiliado);
    // return this.http.put<Afiliado>(`afiliado/consultar-por-id/${id}`,afiliado)
    }

}