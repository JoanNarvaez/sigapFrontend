import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule,Router  } from '@angular/router';
import { RepresentanteLegalService } from '../services/Empresa/representante-legal.service';
import { RepresentanteLegal } from '../model/representanteLegal';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss'
})
export default class RepresentanteLegalComponent implements OnInit {

  private fb = inject(FormBuilder);
  private representanteLegalService = inject(RepresentanteLegalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  

  form?: FormGroup;
  representantelegal?: RepresentanteLegal;
  errors: string[] =[];

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  // console.log('id',id);
  if (id){
    this.representanteLegalService.get(parseInt(id))
    .subscribe(representantelegal =>{
      this.representantelegal = representantelegal;
      this.form =this.fb.group({
        id:[representantelegal.id],
        tipo_identificacion: [representantelegal.tipo_identificacion, [Validators.required, Validators.maxLength(2)]],
        numero_identificacion: [representantelegal.numero_identificacion, [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
        primer_apellido: [representantelegal.primer_apellido, [Validators.required, Validators.maxLength(60)]],
        segundo_apellido: [representantelegal.segundo_apellido, [Validators.maxLength(60)]],
        primer_nombre: [representantelegal.primer_nombre, [Validators.required, Validators.maxLength(60)]],
        segundo_nombre: [representantelegal.segundo_nombre, [Validators.maxLength(60)]],
        codigo_municipio: [representantelegal.codigo_municipio, [Validators.required, Validators.maxLength(5)]],
        telefono: [representantelegal.telefono, [Validators.required, Validators.maxLength(22)]],
        direccion: [representantelegal.direccion, [Validators.required, Validators.maxLength(200)]],
        email: [representantelegal.email, [Validators.required, Validators.email, Validators.maxLength(80)]]
  });

})
}else{
  this.form = this.fb.group({
    tipo_identificacion: ['', [Validators.required, Validators.maxLength(2)]],
    numero_identificacion: [null, [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
    primer_apellido: ['', [Validators.required, Validators.maxLength(60)]],
    segundo_apellido: ['', [Validators.maxLength(60)]],
    primer_nombre: ['', [Validators.required, Validators.maxLength(60)]],
    segundo_nombre: ['', [Validators.maxLength(60)]],
    codigo_municipio: ['', [Validators.required, Validators.maxLength(5)]],
    telefono: ['', [Validators.required, Validators.maxLength(22)]],
    direccion: ['', [Validators.required, Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]]
    
});

}
}
  save() {
    this.form?.markAllAsTouched();
    const representantelegalForm = this.form!.value;

    if (this.representantelegal) {
      this.representanteLegalService.update(this.representantelegal.id,representantelegalForm)
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
      this.representanteLegalService.create(representantelegalForm)
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
