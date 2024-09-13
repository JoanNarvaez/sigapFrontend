import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RepresentanteLegal } from '../../model/representanteLegal';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteLegalService {

  private http =inject(HttpClient);

  get(id:number){
    return this.http.get<RepresentanteLegal>(`http://localhost:8080/representante-legal/consultar-por-id/${id}`);
    // return this.http.get<Afiliado>(`afiliado/consultar-por-id/${id}`);
  }
  
  create(representanteLegal: RepresentanteLegal){
  return this.http.post<RepresentanteLegal>('http://localhost:8080/representante-legal/registrar',representanteLegal);
  // return this.http.post<Afiliado>('afiliado/registrar',afiliado)
  }
  
  update(id: number, representanteLegal: RepresentanteLegal){
      return this.http.put<RepresentanteLegal>(`http://localhost:8080/representante-legal/actualizar/${id}`,representanteLegal);
      // return this.http.put<Afiliado>(`afiliado/consultar-por-id/${id}`,afiliado)
      }
  
  }