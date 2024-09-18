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
import { MatButtonModule } from '@angular/material/button';
import AfiliadoComponent from '../afiliado/afiliado.component';

@Component({
  selector: 'app-lista-afiliados',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './lista-afiliados.component.html',
  styleUrl: './lista-afiliados.component.scss',
})
export default class ListaAfiliadosComponent implements OnInit {
  private afiliadosService = inject(AfiliadoService);
  private dialog = inject(MatDialog);

  afiliados: Afiliado[] = [];
  pageSize: number = 8;
  currentPage: number = 1;
  totalPages: number = 1;

  ngOnInit(): void {
    this.loadAll();
  }

  // openDialog(id: Afiliado) {
  //   this.dialog.open(AfiliadoComponent, {
  //     data: { id },
  //   });
  // }
  openDialog(afiliado: Afiliado) {
    this.dialog.open(AfiliadoComponent, {
      data: { afiliado: afiliado },
      width: '500px'
    });
  }

  loadAll() {
    this.afiliadosService.list().subscribe((afiliados) => {
      this.afiliados = afiliados;
      this.totalPages = Math.ceil(this.afiliados.length / this.pageSize);
    });
  }

  deleteAfiliado(afiliado: Afiliado) {
    this.afiliadosService.delete(afiliado.id).subscribe(() => {
      this.loadAll();
    });
  }
  get paginatedAfiliados() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.afiliados.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
