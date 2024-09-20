import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmpresaService } from '../services/Empresa/empresa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Empresa } from '../model/empresa.interface';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss',
})
export default class EmpresaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private empresaService = inject(EmpresaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form?: FormGroup;
  empresa?: Empresa;
  errors: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('id',id);
    if (id) {
      this.empresaService.get(parseInt(id)).subscribe((empresa) => {
        this.empresa = empresa;
        this.form = this.fb.group({
          id: [empresa.id],
          tipo_identificacion: [
            empresa.tipo_identificacion,
            [Validators.required, Validators.maxLength(2)],
          ],
          razon_social: [
            empresa.razon_social,
            [Validators.required, Validators.maxLength(200)],
          ],
          numero_nit: [
            empresa.numero_nit,
            [
              Validators.required,
              Validators.maxLength(12),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          digito_verificacion: [
            empresa.digito_verificacion,
            [
              Validators.required,
              Validators.maxLength(1),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          tipo_entidad: [
            empresa.tipo_entidad,
            [Validators.required, Validators.maxLength(1)],
          ],
          codigo_municipio: [
            empresa.codigo_municipio,
            [Validators.required, Validators.maxLength(5)],
          ],
          actividad_economica: [
            empresa.actividad_economica,
            [
              Validators.required,
              Validators.maxLength(4),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          telefono: [
            empresa.telefono,
            [Validators.required, Validators.maxLength(22)],
          ],
          direccion: [
            empresa.direccion,
            [Validators.required, Validators.maxLength(200)],
          ],
          email: [
            empresa.email,
            [Validators.required, Validators.email, Validators.maxLength(101)],
          ],
          valor_activo: [
            empresa.valor_activo,
            [
              Validators.required,
              Validators.maxLength(20),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          valor_pasivo: [
            empresa.valor_pasivo,
            [
              Validators.required,
              Validators.maxLength(20),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          valor_patrimonio: [
            empresa.valor_patrimonio,
            [
              Validators.required,
              Validators.maxLength(20),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          valor_patrimonio_sin_re: [
            empresa.valor_patrimonio_sin_re,
            [
              Validators.required,
              Validators.maxLength(20),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          valor_reserva_especial: [
            empresa.valor_reserva_especial,
            [
              Validators.required,
              Validators.maxLength(20),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          codigo_Contable: [
            empresa.codigo_Contable,
            [
              Validators.required,
              Validators.maxLength(8),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
        });
      });
    } else {
      this.form = this.fb.group({
        tipo_identificacion: [
          '',
          [Validators.required, Validators.maxLength(2)],
        ],
        razon_social: ['', [Validators.required, Validators.maxLength(200)]],
        numero_nit: [
          '',
          [
            Validators.required,
            Validators.maxLength(12),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        digito_verificacion: [
          '',
          [
            Validators.required,
            Validators.maxLength(1),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        tipo_entidad: ['', [Validators.required, Validators.maxLength(1)]],
        codigo_municipio: ['', [Validators.required, Validators.maxLength(5)]],
        actividad_economica: [
          '',
          [
            Validators.required,
            Validators.maxLength(4),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        telefono: ['', [Validators.required, Validators.maxLength(22)]],
        direccion: ['', [Validators.required, Validators.maxLength(200)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(101)],
        ],
        valor_activo: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        valor_pasivo: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        valor_patrimonio: [
          '',
          [
            Validators.required,
            Validators.maxLength,
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        valor_patrimonio_sin_re: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        valor_reserva_especial: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        codigo_Contable: [
          '',
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
      });
    }
  }
  save() {
    this.form?.markAllAsTouched(); // Marca todos los campos como tocados para activar las validaciones

    // Verifica si el formulario es inválido
    if (this.form?.invalid) {
      console.error(
        'Formulario inválido. Por favor, corrija los errores antes de enviar.'
      );
      this.errors = [
        'Por favor, corrija los errores en el formulario antes de enviar.',
      ];
      return; // Detiene la ejecución si el formulario es inválido
    }

    // Obtiene los valores del formulario
    const empresaForm = this.form!.value;

    // Verifica si la entidad empresa ya existe para actualizar o crear una nueva
    if (this.empresa) {
      // Si existe, realiza la actualización
      this.empresaService.update(this.empresa.id, empresaForm).subscribe({
        next: () => {
          this.errors = [];
          Swal.fire({
            icon: 'success',
            title: 'Proceso Exitoso',
            text: 'Actualizacion realizada de manera exitosa',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']); // Redirige después de la actualización
            }
          });
        },
        error: (response) => {
          console.error('Error al actualizar:', response.error);
          this.errors = Array.isArray(response.error)
            ? response.error
            : [response.error];
        },
      });
    } else {
      // Si no existe, crea una nueva empresa
      this.empresaService.create(empresaForm).subscribe({
        next: () => {
          this.errors = [];
          Swal.fire({
            icon: 'success',
            title: 'Proceso Exitoso',
            text: 'Creacion realizada de manera exitosa',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']); // Redirige después de la actualización
            }
          });
        },
        error: (response) => {
          console.error('Error al crear:', response.error);
          this.errors = Array.isArray(response.error)
            ? response.error
            : [response.error];
        },
      });
    }
  }
}
