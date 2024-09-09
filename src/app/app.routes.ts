import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  { path: '',  
    loadComponent: ()=> import('./lista-afiliados/lista-afiliados.component')
  },
  { path: 'empresa',  
    loadComponent: ()=> import('./empresa/empresa.component')
  },
  { path: 'new',  
    loadComponent: ()=> import('./afiliado-form/afiliado-form.component')
  },
  { path: 'afiliados/:id/editar', 
    loadComponent: ()=> import('./afiliado-form/afiliado-form.component')
  }
  
];


