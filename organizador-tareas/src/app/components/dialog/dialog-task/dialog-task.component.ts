import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { LoginService } from 'src/app/Servicios/LoginService.service';
import { UsuariosTablerosService } from 'src/app/Servicios/usuariosTableros.service';
import { ColumnasService } from 'src/app/Servicios/columnas.service';

/*para ejemplo de descripcion de tarea*/
export interface DialogData {
  nombre: string;
  descripcion: string;
}

export interface Datos {
  ID: number;
  NOMBRE: string;
}


@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent implements OnInit {
  descripcion!: string;/*descripcion de tarea*/

  usuarios: any[] = [];
  /*para asignar usuario*/
  /*position = new FormControl(this.usuario[0]); /*para asignar usuario*/
  prioridades: Datos[] = [
    {
      ID: 1,
      NOMBRE: 'Alta'
    },
    {
      ID: 2,
      NOMBRE: 'Media'
    },
    {
      ID: 3,
      NOMBRE: 'Baja'
    }
  ]; /*prioridad*/

  /*formTask: FormGroup;*/

  constructor(
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public loginService: LoginService,
    private usuariosTablerosService: UsuariosTablerosService,
    private columnasService: ColumnasService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.usuariosTablerosService.getUsuariosByTablero(this.columnasService.codigoTablero).subscribe(res => {
      this.usuarios = res;
    })
  }


}
