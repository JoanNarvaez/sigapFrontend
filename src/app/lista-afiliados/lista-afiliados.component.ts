import { Component, inject, OnInit } from '@angular/core';
import { AfiliadoService } from '../services/Empresa/afiliado.service';
import { RouterModule } from '@angular/router';
import { Afiliado } from '../model/afiliado.interface';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import AfiliadoComponent from '../afiliado/afiliado.component';

@Component({
  selector: 'app-lista-afiliados',
  standalone: true,
  imports: [RouterModule,MatButtonModule],
  templateUrl: './lista-afiliados.component.html',
  styleUrl: './lista-afiliados.component.scss'
})
export default class ListaAfiliadosComponent implements OnInit{
private afiliadosService = inject(AfiliadoService);
private dialog = inject(MatDialog);
afiliados: Afiliado[] = [];

ngOnInit(): void {
  this.afiliadosService.list()
    .subscribe((afiliados) =>{
      // console.log(afiliado);
      this.afiliados=afiliados;
    })
  
  }
    openDialog(id:Afiliado) {
      this.dialog.open(AfiliadoComponent, {
        data: {id},
      });
    }
   


}


