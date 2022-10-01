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

@NgModule({
  declarations: [
    DialogComponent,
    DialogBodyComponent,
    DialogTaskComponent,
    DialogSeeTaskComponent
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
  ]
})
export class DialogModule { }