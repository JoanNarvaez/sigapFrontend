import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { AfiliadoService } from '../services/Empresa/afiliado.service';
import { Afiliado } from '../model/afiliado.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Don't validate empty values to allow optional controls
    }

    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    // Check if date is valid
    if (isNaN(inputDate.getTime())) {
      return { invalidDate: true };
    }

    // Check if date is in the future
    if (inputDate > today) {
      return { futureDate: true };
    }

    // Check if age is reasonable (e.g., not older than 120 years)
    const maxAge = 120;
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - maxAge);
    if (inputDate < minDate) {
      return { tooOld: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-afiliado-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './afiliado-form.component.html',
  styleUrl: './afiliado-form.component.scss',
})
export default class AfiliadoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private afiliadoService = inject(AfiliadoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form?: FormGroup;
  afiliado?: Afiliado;
  errors: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('id',id);

    if (id) {
      this.afiliadoService.get(parseInt(id)).subscribe((afiliado) => {
        // console.log('c',afiliado);
        this.afiliado = afiliado;
        this.form = this.fb.group({
          tipo_documento: [afiliado.tipo_documento, Validators.required],
          numero_identificacion: [
            afiliado.numero_identificacion,
            [
              Validators.required,
              Validators.maxLength(16),
              Validators.pattern(/^[0-9]+$/),
            ],
          ],
          primer_apellido: [
            afiliado.primer_apellido,
            [Validators.required, Validators.maxLength(60)],
          ],
          segundo_apellido: [afiliado.segundo_apellido], // No se requiere validator
          primer_nombre: [
            afiliado.primer_nombre,
            [Validators.required, Validators.maxLength(60)],
          ],
          segundo_nombre: [afiliado.segundo_nombre], // No se requiere validator
          fecha_nacimiento: [
            afiliado.fecha_nacimiento,
            [Validators.required, birthDateValidator()],
          ],
          genero: [afiliado.genero, Validators.required],
          codigo_municipio: [
            afiliado.codigo_municipio,
            [Validators.required, Validators.maxLength(5)],
          ],
          indicador: [afiliado.indicador, Validators.required],
          telefono: [
            afiliado.telefono,
            [Validators.required, Validators.maxLength(22)],
          ],
          direccion: [
            afiliado.direccion,
            [Validators.required, Validators.maxLength(200)],
          ],
          email: [
            afiliado.email,
            [Validators.email, Validators.maxLength(101)],
          ],
          // email: [afiliado.email,Validators.email],
          fecha_ingreso: [
            afiliado.fecha_ingreso,
            [Validators.required, birthDateValidator()],
          ],
          fecha_retiro: [afiliado.fecha_retiro, birthDateValidator()], // No se requiere validator
        });
      });
    } else {
      this.form = this.fb.group({
        tipo_documento: ['', Validators.required],
        numero_identificacion: [
          '',
          [
            Validators.required,
            Validators.maxLength(16),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        primer_apellido: ['', [Validators.required, Validators.maxLength(60)]],
        segundo_apellido: [''], // No se requiere validator
        primer_nombre: ['', [Validators.required, Validators.maxLength(60)]],
        segundo_nombre: [''], // No se requiere validator
        fecha_nacimiento: ['', [Validators.required, birthDateValidator()]],
        genero: ['', Validators.required],
        codigo_municipio: ['', [Validators.required, Validators.maxLength(5)]],
        indicador: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.maxLength(22)]],
        direccion: ['', [Validators.required, Validators.maxLength(200)]],
        // email: ['',Validators.required, Validators.email],
        email: ['', [Validators.email, Validators.maxLength(101)]], // No se requiere validator
        fecha_ingreso: ['', [Validators.required, birthDateValidator()]],
        fecha_retiro: ['', birthDateValidator()], // No se requiere validator
      });
    }
  }

  // Validador personalizado que verifica si la fecha es futura

  save() {
    this.form?.markAllAsTouched(); // Marca todos los campos como tocados para activar las validaciones

    // Obtiene los valores del formulario
    const afiliadoForm = this.form!.value;

    // Verifica si la entidad afiliado ya existe para actualizar o crear una nueva
    if (this.afiliado) {
      // Si existe, realiza la actualización
      this.afiliadoService.update(this.afiliado.id, afiliadoForm).subscribe({
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
      // Si no existe, crea un nuevo afiliado
      this.afiliadoService.create(afiliadoForm).subscribe({
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
