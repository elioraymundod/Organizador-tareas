import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroPrincipalComponent } from './tablero-principal/tablero-principal.component';
import { TablerosComponent } from './tableros/tableros.component';

const routes: Routes = [
  {
    path: 'tablero-principal',
    component: TableroPrincipalComponent
  },
  {
    path: 'tablero',
    component: TablerosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
