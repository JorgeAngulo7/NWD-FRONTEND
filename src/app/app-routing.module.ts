import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './templates/error/error.component';
import { HomeComponent } from './templates/home/home.component';

const routes: Routes = [
  {
    path:"inicio",
    component: HomeComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path: 'administracion',
    loadChildren: () => import('./modulos/administracion/administracion.module').then(m => m.AdministracionModule)
  },
  {
    path:'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: '**',
    component:ErrorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
