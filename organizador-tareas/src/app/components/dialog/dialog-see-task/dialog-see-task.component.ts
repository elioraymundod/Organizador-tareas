import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from 'src/app/Servicios/board.service';
import { ColumnasService } from 'src/app/Servicios/columnas.service';
import { UsuariosTablerosService } from 'src/app/Servicios/usuariosTableros.service';

interface Usuarios {
  ID: string;
  NOMBRE: string;
}


@Component({
  selector: 'app-dialog-see-task',
  templateUrl: './dialog-see-task.component.html',
  styleUrls: ['./dialog-see-task.component.css']
})
export class DialogSeeTaskComponent implements OnInit {
  formActivity: FormGroup;
  avance: any;

  usuarios: any[] = [];

  priridades: Usuarios[] = [
    {ID: '1', NOMBRE: 'Alta'},
    {ID: '2', NOMBRE: 'Media'},
    {ID: '3', NOMBRE: 'Baja'},
  ];


  constructor(
    public dialogRef: MatDialogRef<DialogSeeTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public boardService: BoardService,
    private _formBuilder: FormBuilder,
    public columnasService: ColumnasService,
    private usuariosTablerosService: UsuariosTablerosService
  ) { 
    this.formActivity = this._formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.avance = this.columnasService.avance;

    this.usuariosTablerosService.getUsuariosByTablero(this.columnasService.codigoTablero).subscribe(res => {
      this.usuarios = res;
      this.usuarios.forEach(usuario => {
        usuario.ID = String(usuario.ID)
      })
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    //this.boardService.saveChanges(this.codigoTablero);
  }

  onDeleteCard(cardId: any, columnId: number, activityId: number) {
    this.boardService.deleteActivity(cardId, columnId, activityId, this.columnasService.codigoTablero)
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onAddActivities(columnId: number, cardId: number) { //event: { id: number, nombre: string, status: number}, columnId: number
    let nombre = this.formActivity.get('nombre')?.value;
    this.boardService.addActivity(columnId, cardId, nombre, 1);
    this.formActivity.get('nombre')?.setValue(" ")
  }

}
