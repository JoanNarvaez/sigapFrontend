import { DatePipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AfiliadoService } from '../services/Empresa/afiliado.service';
import { Afiliado } from '../model/afiliado.interface';

@Component({
  selector: 'app-afiliado',
  standalone: true,
  imports: [RouterModule, MatDialogTitle, MatDialogContent, DatePipe],
  templateUrl: './afiliado.component.html',
  styleUrl: './afiliado.component.scss',
})
export default class AfiliadoComponent {
  afiliado: Afiliado;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { afiliado: Afiliado }) {
    this.afiliado = data.afiliado;
    console.log('Afiliado recibido:', this.afiliado);
  }
}
