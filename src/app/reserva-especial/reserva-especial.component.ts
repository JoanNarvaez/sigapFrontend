import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaEspecial } from '../model/reservaEspecial';
import { ReservaEspecialService } from '../services/Empresa/reserva-especial.service';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-reserva-especial',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './reserva-especial.component.html',
  styleUrl: './reserva-especial.component.scss'
})
export default class ReservaEspecialComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reservaEspecialService = inject(ReservaEspecialService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form?: FormGroup;
  reservaEspecial?: ReservaEspecial;
  errors: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reservaEspecialService.get(parseInt(id))
        .subscribe(reservaEspecial => {
          this.reservaEspecial = reservaEspecial;
          this.form = this.fb.group({
            id: [reservaEspecial.id],
            tipo_identificacion: [reservaEspecial.tipo_identificacion, [Validators.required, Validators.maxLength(2)]],
            tipo_persona: [reservaEspecial.tipo_persona, [Validators.required]],
            numero_identificacion: [reservaEspecial.numero_identificacion, [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
            digito_verificacion: [reservaEspecial.digito_verificacion, [Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
            razon_social: [reservaEspecial.razon_social, [Validators.maxLength(200)]],
            primer_apellido: [reservaEspecial.primer_apellido, [Validators.required, Validators.maxLength(60)]],
            segundo_apellido: [reservaEspecial.segundo_apellido, [Validators.maxLength(60)]],
            primer_nombre: [reservaEspecial.primer_nombre, [Validators.required, Validators.maxLength(60)]],
            segundo_nombre: [reservaEspecial.segundo_nombre, [Validators.maxLength(60)]],
            tarjeta_profecional: [reservaEspecial.tarjeta_profecional, [Validators.maxLength(20)]],
            codigo_municipio: [reservaEspecial.codigo_municipio, [Validators.required, Validators.maxLength(5)]],
            telefono: [reservaEspecial.telefono, [Validators.required, Validators.maxLength(22)]],
            direccion: [reservaEspecial.direccion, [Validators.required, Validators.maxLength(200)]],
            email: [reservaEspecial.email, [Validators.required, Validators.email, Validators.maxLength(80)]]
          });
        });
    } else {
      this.form = this.fb.group({
        tipo_identificacion: ['', [Validators.required, Validators.maxLength(2)]],
        tipo_persona: ['', [Validators.required]],
        numero_identificacion: [null, [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
        digito_verificacion: ['', [Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
        razon_social: ['', [Validators.maxLength(200)]],
        primer_apellido: ['', [Validators.required, Validators.maxLength(60)]],
        segundo_apellido: ['', [Validators.maxLength(60)]],
        primer_nombre: ['', [Validators.required, Validators.maxLength(60)]],
        segundo_nombre: ['', [Validators.maxLength(60)]],
        tarjeta_profecional: ['', [Validators.maxLength(20)]],
        codigo_municipio: ['', [Validators.required, Validators.maxLength(5)]],
        telefono: ['', [Validators.required, Validators.maxLength(22)]],
        direccion: ['', [Validators.required, Validators.maxLength(200)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]]
      });
    }
  }

  save() {
    this.form?.markAllAsTouched();
    const reservaEspecialForm = this.form!.value;

    if (this.reservaEspecial) {
      this.reservaEspecialService.update(this.reservaEspecial.id, reservaEspecialForm)
        .subscribe({
          next: () => {
            this.errors = [];
            this.router.navigate(['/']);
          },
          error: response => {
            this.errors = Array.isArray(response.error) ? response.error : [response.error];
          }
        });
    } else {
      this.reservaEspecialService.create(reservaEspecialForm)
        .subscribe({
          next: () => {
            this.errors = [];
            this.router.navigate(['/']);
          },
          error: response => {
            this.errors = Array.isArray(response.error) ? response.error : [response.error];
          }
        });
    }
  }
}