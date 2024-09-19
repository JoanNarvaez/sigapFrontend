import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReservaEspecial } from '../../model/reservaEspecial';

@Injectable({
  providedIn: 'root',
})
export class ReservaEspecialService {
  private http = inject(HttpClient);

  get(id: number) {
    return this.http.get<ReservaEspecial>(
      `http://localhost:8080/reserva-especial/consultar-por-id/${id}`
    );
  }

  create(reservaEspecial: ReservaEspecial) {
    return this.http.post<ReservaEspecial>(
      'http://localhost:8080/reserva-especial/registrar',
      reservaEspecial
    );
  }

  update(id: number, reservaEspecial: ReservaEspecial) {
    return this.http.put<ReservaEspecial>(
      `http://localhost:8080/reserva-especial/actualizar/${id}`,
      reservaEspecial
    );
  }
}
