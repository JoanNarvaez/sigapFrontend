import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AfiliadoService } from '../services/Empresa/afiliado.service';
import { Afiliado } from '../model/afiliado.interface';


@Component({
  selector: 'app-afiliado-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './afiliado-form.component.html',
  styleUrl: './afiliado-form.component.scss',
})
export default class AfiliadoFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  // private router = inject(Router);
  private afiliadoService = inject(AfiliadoService);
  private route = inject(ActivatedRoute);

  // form = this.fb.group({
  //   tipo_documento: ['', Validators.required],
  //   numero_identificacion: ['', Validators.required],
  //   primer_apellido: ['', Validators.required],
  //   segundo_apellido: [''], // No se requiere validator
  //   primer_nombre: ['', Validators.required],
  //   segundo_nombre: [''], // No se requiere validator
  //   fecha_nacimiento: ['', Validators.required],
  //   genero: ['', Validators.required],
  //   codigo_municipio: ['', Validators.required],
  //   indicador: ['', Validators.required],
  //   telefono: ['', Validators.required],
  //   direccion: ['', Validators.required],
  //   email: [''], // No se requiere validator
  //   fecha_ingreso: ['', Validators.required],
  //   fecha_retiro: [''], // No se requiere validator
  // });

  form?: FormGroup;
  afiliado?: Afiliado;

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  // console.log('id',id);
  if (id){
    this.afiliadoService.get(parseInt(id))
    .subscribe(afiliado =>{
      // console.log('c',afiliado);
    this.afiliado = afiliado;
    this.form =this.fb.group({
    tipo_documento: [afiliado.tipo_documento, Validators.required],
    numero_identificacion: [afiliado.numero_identificacion, Validators.required],
    primer_apellido: [afiliado.primer_apellido, Validators.required],
    segundo_apellido: [afiliado.segundo_apellido], // No se requiere validator
    primer_nombre: [afiliado.primer_nombre, Validators.required],
    segundo_nombre: [afiliado.segundo_nombre], // No se requiere validator
    fecha_nacimiento: [afiliado.fecha_nacimiento, Validators.required],
    genero: [afiliado.genero, Validators.required],
    codigo_municipio: [afiliado.codigo_municipio, Validators.required],
    indicador: [afiliado.indicador, Validators.required],
    telefono: [afiliado.telefono, Validators.required],
    direccion: [afiliado.direccion, Validators.required],
    email: [afiliado.email], // No se requiere validator
    fecha_ingreso: [afiliado.fecha_ingreso, Validators.required],
    fecha_retiro: [afiliado.fecha_retiro], // No se requiere validator
  });

    })
  }else{
    this.form = this.fb.group({
        tipo_documento: ['', Validators.required],
        numero_identificacion: ['', Validators.required],
        primer_apellido: ['', Validators.required],
        segundo_apellido: [''], // No se requiere validator
        primer_nombre: ['', Validators.required],
        segundo_nombre: [''], // No se requiere validator
        fecha_nacimiento: ['', Validators.required],
        genero: ['', Validators.required],
        codigo_municipio: ['', Validators.required],
        indicador: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required],
        email: [''], // No se requiere validator
        fecha_ingreso: ['', Validators.required],
        fecha_retiro: [''], // No se requiere validator
      });
    
  }

  
}

  
  save() {
    const afiliadoForm = this.form!.value;
    if (this.afiliado){
      this.afiliadoService.update(this.afiliado.id, afiliadoForm)
      .subscribe(() => {});
    }else{
      this.afiliadoService.create(afiliadoForm)
      .subscribe(() => {});
    }
   
  }

  // save() {
  //   const afiliadoForm = this.form!.value;
  //   if (this.afiliado) {
  //       this.afiliadoService.update(this.afiliado.id, afiliadoForm)
  //           .subscribe({
  //               next: () => {
  //                   console.log("Afiliado actualizado correctamente");
  //               },
  //               error: (err) => {
  //                   console.error("Error actualizando afiliado: ", err);
  //               }
  //           });
  //   } else {
  //     this.afiliadoService.create(afiliadoForm)
  //       .subscribe({
  //         next: () => {
  //           // Acción a realizar después de la creación, como notificar al usuario.
  //         },
  //         error: (err) => {
  //           // Manejo del error
  //         }
  //       });
  //   }
  // }
  


}
