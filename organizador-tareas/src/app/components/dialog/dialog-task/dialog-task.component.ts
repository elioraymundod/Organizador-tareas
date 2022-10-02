import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';

/*para ejemplo de descripcion de tarea, cambiar esfuerzo*/
export interface DialogData {
  nombre: string;
  descripcion: string;
}
/*para ejemplo de descripcion de tarea*/

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent implements OnInit {
  descripcion!: string;/*para ejemplo de descripcion de tarea*/

  usuario: string[] = ['Melani', 'usuario2', 'usuario3']; /*para asignar usuario*/
  /*position = new FormControl(this.usuario[0]); /*para asignar usuario*/
  prioridad: string[] = ['Alta', 'Media', 'Baja']; /*prioridad*/

  /*formTask: FormGroup;*/

    constructor(
      public dialogRef: MatDialogRef<DialogTaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _formBuilder: FormBuilder
    ) {
      /*this.formTask = this._formBuilder.group({
        tituloControl: ['', (Validators.required)],
        descripcionControl: ['', (Validators.required)],
        fechaInicioControl: ['', (Validators.required)],
        fechaFinControl: ['', (Validators.required)],
        prioridadControl: ['', (Validators.required)]
      })*/

     }

  onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
    }


  }
