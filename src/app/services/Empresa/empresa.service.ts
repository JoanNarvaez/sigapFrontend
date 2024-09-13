import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../../model/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

private http =inject(HttpClient);

get(id:number){
  return this.http.get<Empresa>(`http://localhost:8080/empresa/consultar-por-id/${id}`);
  // return this.http.get<Afiliado>(`afiliado/consultar-por-id/${id}`);
}

create(empresa: Empresa){
return this.http.post<Empresa>('http://localhost:8080/empresa/registrar',empresa);
// return this.http.post<Afiliado>('afiliado/registrar',afiliado)
}

update(id: number, empresa: Empresa){
    return this.http.put<Empresa>(`http://localhost:8080/empresa/actualizar/${id}`,empresa);
    // return this.http.put<Afiliado>(`afiliado/consultar-por-id/${id}`,afiliado)
    }

}