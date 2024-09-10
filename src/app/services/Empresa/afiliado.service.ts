import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Afiliado } from "../../model/afiliado.interface";

@Injectable({
    providedIn: 'root'
  })
  export class AfiliadoService {

    private http =inject(HttpClient);

    list(){
        return this.http.get<Afiliado[]>('http://localhost:8080/afiliado/consultar-todos')
        // return this.http.get<Afiliado[]>('afiliado/consultar-todos')
    }
    get(id:number){
        return this.http.get<Afiliado>(`http://localhost:8080/afiliado/consultar-por-id/${id}`);
        // return this.http.get<Afiliado>(`afiliado/consultar-por-id/${id}`);
    }

    create(afiliado: Afiliado){
    return this.http.post<Afiliado>('http://localhost:8080/afiliado/registrar',afiliado);
    // return this.http.post<Afiliado>('afiliado/registrar',afiliado)
    }

    update(id: number, afiliado: Afiliado){
        return this.http.put<Afiliado>(`http://localhost:8080/afiliado/actualizar/${id}`,afiliado);
        // return this.http.put<Afiliado>(`afiliado/consultar-por-id/${id}`,afiliado)
        }

    delete(id: number){
        return this.http.delete<void>(`http://localhost:8080/afiliado/consultar-por-id/${id}`);
        // return this.http.delete<void>(`afiliado/consultar-por-id/${id}`)
            }

  }