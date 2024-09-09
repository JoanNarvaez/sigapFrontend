import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AfiliadoService } from '../services/Empresa/afiliado.service';


@Component({
  selector: 'app-afiliado',
  standalone: true,
  imports: [RouterModule,MatDialogTitle, MatDialogContent,DatePipe],
  templateUrl: './afiliado.component.html',
  styleUrl: './afiliado.component.scss'
})
export default class AfiliadoComponent {
afiliado = inject(MAT_DIALOG_DATA);

constructor() {
  // this.afiliado = AfiliadoService;
  // Puedes revisar los datos recibidos en la consola si es necesario
  console.log(this.afiliado);
}
ngOnInit(): void{
  
}

}