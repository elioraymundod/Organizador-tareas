import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityService } from 'src/app/Servicios/activity.service';

interface Usuarios {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dialog-see-task',
  templateUrl: './dialog-see-task.component.html',
  styleUrls: ['./dialog-see-task.component.css']
})
export class DialogSeeTaskComponent implements OnInit {
  usuarios: Usuarios[] = [
    {value: '0', viewValue: 'Selvin'},
    {value: '1', viewValue: 'Melany'},
    {value: '2', viewValue: 'Elio'},
  ];

  priridades: Usuarios[] = [
    {value: '0', viewValue: 'Alta'},
    {value: '1', viewValue: 'Media'},
    {value: '2', viewValue: 'Baja'},
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogSeeTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activityService: ActivityService,
  ) { }

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

  onDeleteCard(cardId: any, columnId: number) {
    // this.boardService.deleteCard(cardId, columnId, this.codigoTablero)
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
