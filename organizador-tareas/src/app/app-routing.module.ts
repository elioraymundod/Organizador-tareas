import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board/board.component';
import { LoginComponent } from './login/login.component';
import { TableroPrincipalComponent } from './tablero-principal/tablero-principal.component';
import { TablerosComponent } from './tableros/tableros.component';

const routes: Routes = [
  {
    path: 'tablero/:codigo_tablero',
    component: BoardComponent
  },
  {
    path: 'tablero-principal',
    component: TableroPrincipalComponent
  },
  {
    path:'login',component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
