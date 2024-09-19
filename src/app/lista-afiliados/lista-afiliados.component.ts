import { Component, inject, OnInit } from '@angular/core';
import { AfiliadoService } from '../services/Empresa/afiliado.service';
import { RouterModule } from '@angular/router';
import { Afiliado } from '../model/afiliado.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import AfiliadoComponent from '../afiliado/afiliado.component';
import { DownloadService } from '../services/Empresa/download.service';

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
  constructor(private downloadService: DownloadService) {}

  afiliados: Afiliado[] = [];
  pageSize: number = 8;
  currentPage: number = 1;
  totalPages: number = 1;

  ngOnInit(): void {
    this.loadAll();
  }

  openDialog(afiliado: Afiliado) {
    this.dialog.open(AfiliadoComponent, {
      data: { afiliado: afiliado },
      width: '500px',
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

  downloadAllData() {
    this.downloadService.downloadAllData().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'all_data.txt';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => console.error('Error al descargar el archivo', error)
    );
  }
}
