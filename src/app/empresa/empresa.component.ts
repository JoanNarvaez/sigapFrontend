import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaService } from '../services/Empresa/empresa.service';
import { ActivatedRoute, Router, RouterModule  } from '@angular/router';
import { Empresa } from '../model/empresa.interface';



@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export default class EmpresaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private empresaService = inject(EmpresaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form?: FormGroup;
  empresa?: Empresa;
  errors: string[] =[];

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  // console.log('id',id);
  if (id){
    this.empresaService.get(parseInt(id))
    .subscribe(empresa =>{
      this.empresa = empresa;
      this.form =this.fb.group({
        tipo_identificacion: [empresa.tipo_identificacion, Validators.required],
    razon_social: [empresa.razon_social, Validators.required],
    numero_nit: [empresa.numero_nit, Validators.required],
    digito_verificacion: [empresa.digito_verificacion, Validators.required],
    tipo_entidad: [empresa.tipo_entidad, Validators.required],
    codigo_municipio: [empresa.codigo_municipio, Validators.required],
    actividad_economica: [empresa.actividad_economica, Validators.required],
    telefono: [empresa.telefono, Validators.required],
    direccion: [empresa.direccion, Validators.required],
    email: [empresa.email, [Validators.required, Validators.email]],
    valor_activo: [empresa.valor_activo, Validators.required],
    valor_pasivo: [empresa.valor_pasivo, Validators.required],
    valor_patrimonio: [empresa.valor_patrimonio, Validators.required],
    valor_patrimonio_sin_re: [empresa.valor_patrimonio_sin_re,Validators.required],
    valor_reserva_especial: [empresa.valor_reserva_especial,Validators.required],
    codigo_Contable: [empresa.codigo_Contable,Validators.required], 
  });

})
}else{
  this.form = this.fb.group({
    tipo_identificacion: ['', Validators.required],
    razon_social: ['', Validators.required],
    numero_nit: ['', Validators.required],
    digito_verificacion: ['', Validators.required],
    tipo_entidad: ['', Validators.required],
    codigo_municipio: ['', Validators.required],
    actividad_economica: ['', Validators.required],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    valor_activo: ['', Validators.required],
    valor_pasivo: ['', Validators.required],
    valor_patrimonio: ['', Validators.required],
    valor_patrimonio_sin_re: ['',Validators.required],
    valor_reserva_especial: ['',Validators.required],
    codigo_Contable: ['',Validators.required], 
  });
    
}


}
  save() {
    this.form?.markAllAsTouched();
    const empresaForm = this.form!.value;

    if (this.empresa) {
      this.empresaService.update(this.empresa.id, empresaForm)
        .subscribe({
          next: () => {
            this.errors = [];
            this.router.navigate(['/']);
          },
          error: response => {
            // console.log('response', response.error);
            this.errors = Array.isArray(response.error) ? response.error : [response.error];
          }
        });
    } else {
      this.empresaService.create(empresaForm)
        .subscribe({
          next: () => {
            this.errors = [];
            this.router.navigate(['/']);
          },
          error: response => {
            console.log('response', response.error);
            this.errors = Array.isArray(response.error) ? response.error : [response.error];
          }
        });
    }
  }
}

//   private fb = inject(FormBuilder);
//   private empresaService = inject(EmpresaService);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);

//   form?: FormGroup;
//   empresa?: Empresa;
//   errors: string[] = [];

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
    
//     if (id) {
//       this.empresaService.get(parseInt(id))
//         .subscribe({
//           next: empresa => {
//             this.empresa = empresa;
//             this.initializeForm(empresa);
//           },
//           error: () => this.router.navigate(['/']) // Redirigir si ocurre un error
//         });
//     } else {
//       this.initializeForm();
//     }
//   }

//   private initializeForm(empresa?: Empresa): void {
//     this.form = this.fb.group({
//       tipo_identificacion: [empresa?.tipo_identificacion || '', Validators.required],
//       razon_social: [empresa?.razon_social || '', Validators.required],
//       numero_nit: [empresa?.numero_nit || '', Validators.required],
//       digito_verificacion: [empresa?.digito_verificacion || '', Validators.required],
//       tipo_entidad: [empresa?.tipo_entidad || '', Validators.required],
//       codigo_municipio: [empresa?.codigo_municipio || '', Validators.required],
//       actividad_economica: [empresa?.actividad_economica || '', Validators.required],
//       telefono: [empresa?.telefono || '', Validators.required],
//       direccion: [empresa?.direccion || '', Validators.required],
//       email: [empresa?.email || '', [Validators.required, Validators.email]],
//       valor_activo: [empresa?.valor_activo || '', Validators.required],
//       valor_pasivo: [empresa?.valor_pasivo || '', Validators.required],
//       valor_patrimonio: [empresa?.valor_patrimonio || '', Validators.required],
//       valor_patrimonio_sin_re: [empresa?.valor_patrimonio_sin_re || ''],
//       valor_reserva_especial: [empresa?.valor_reserva_especial || ''],
//       codigo_Contable: [empresa?.codigo_Contable || '']
//     });
//   }

//   save(): void {
//     this.form?.markAllAsTouched();
//     if (this.form?.invalid) return;

//     const empresaForm = this.form!.value;

//     if (this.empresa) {
//       this.empresaService.update(this.empresa.numero_nit, empresaForm)
//         .subscribe({
//           next: () => {
//             this.errors = [];
//             this.router.navigate(['/']);
//           },
//           error: response => {
//             this.errors = Array.isArray(response.error) ? response.error : [response.error];
//           }
//         });
//     } else {
//       this.empresaService.create(empresaForm)
//         .subscribe({
//           next: () => {
//             this.errors = [];
//             this.router.navigate(['/']);
//           },
//           error: response => {
//             this.errors = Array.isArray(response.error) ? response.error : [response.error];
//           }
//         });
//     }
//   }
// }