import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogComponent } from './dialog/dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { DialogSeeTaskComponent } from './dialog-see-task/dialog-see-task.component';
import { MaterialExampleModule } from 'src/material.module';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { DialogEtiquetaComponent } from './dialog-etiqueta/dialog-etiqueta.component';
import { DialogColaboradorComponent } from './dialog-colaborador/dialog-colaborador.component';
import { UsuariosTablerosService } from 'src/app/Servicios/usuariosTableros.service';
import { LoginService } from 'src/app/Servicios/LoginService.service';
import { EnvioCorreoService } from 'src/app/Servicios/envio-correos.service';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { BoardService } from 'src/app/Servicios/board.service';

@NgModule({
  declarations: [
    DialogComponent,
    DialogBodyComponent,
    DialogTaskComponent,
    DialogSeeTaskComponent,
    ActivityItemComponent,
    DialogEtiquetaComponent,
    DialogColaboradorComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  exports: [
    DialogComponent
  ],
  providers: [
    UsuariosTablerosService,
    LoginService,
    EnvioCorreoService,
    BoardService
  ]
})
export class DialogModule { }