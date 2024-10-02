import { Component, inject, OnInit } from '@angular/core';
import { AfiliadoService } from '../services/Empresa/afiliado.service';
import { RouterModule } from '@angular/router';
import { Afiliado } from '../model/afiliado.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import AfiliadoComponent from '../afiliado/afiliado.component';
import { DownloadService } from '../services/Empresa/download.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-afiliados',
  standalone: true,
  imports: [RouterModule, MatButtonModule, FormsModule],
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
  totalAfiliados: number = 0;
  public searchParam: string = '';

  ngOnInit(): void {
    this.loadAll();
  }

  openDialog(afiliado: Afiliado) {
    this.dialog.open(AfiliadoComponent, {
      data: { afiliado: afiliado },
      width: '800px',
    });
  }

  loadAll() {
    this.afiliadosService.list().subscribe((afiliados) => {
      this.afiliados = afiliados;
      this.totalAfiliados = afiliados.length;
      this.totalPages = Math.ceil(this.afiliados.length / this.pageSize);
    });
  }

  
  deleteAfiliado(afiliado: Afiliado) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.afiliadosService.delete(afiliado.id).subscribe({
          next: () => {
            Swal.fire({
              text: 'Eliminado exitosamente',
              icon: 'success',
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });
            this.loadAll();
          },
          error: () => {
            Swal.fire({
              text: 'Hubo un error al eliminar',
              icon: 'error',
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });
            this.loadAll();
          },
        });
      }
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
        link.download = 'ACO245RACOAAAMMDDNI999999999999.txt';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => console.error('Error al descargar el archivo', error)
    );
  }
  search() {
    if (this.searchParam !== '') {
      const lowerCaseSearch = this.searchParam.toLocaleLowerCase();

      const searchAfiliados: Afiliado[] = this.afiliados.filter((afiliado) => {
        return (
          afiliado.numero_identificacion
            .toLocaleLowerCase()
            .includes(lowerCaseSearch) ||
          afiliado.primer_apellido.toLocaleLowerCase().includes(lowerCaseSearch)||
          afiliado.segundo_apellido.toLocaleLowerCase().includes(lowerCaseSearch)||
          afiliado.primer_nombre.toLocaleLowerCase().includes(lowerCaseSearch)||
          afiliado.segundo_nombre.toLocaleLowerCase().includes(lowerCaseSearch)
        );
      });

      this.afiliados = searchAfiliados;
    } else {
      this.loadAll();
    }
  }
}