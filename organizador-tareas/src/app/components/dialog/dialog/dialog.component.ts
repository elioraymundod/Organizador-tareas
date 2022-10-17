import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DialogSeeTaskComponent } from '../dialog-see-task/dialog-see-task.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
import { DialogEtiquetaComponent } from '../dialog-etiqueta/dialog-etiqueta.component';
import { DialogColaboradorComponent } from '../dialog-colaborador/dialog-colaborador.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Output() emitText: EventEmitter<any> = new EventEmitter()
  @Input() question: string | undefined;
  @Input() procedencia: string | undefined;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    switch (this.procedencia) {
      case "columna":
        const dColumn = this.dialog.open(DialogBodyComponent, {
          width: '400px',
          data: { question: this.question }
        });

        dColumn.afterClosed().subscribe(result => {
          this.emitText.emit(result)
        });
        break;

      case "task":
        const dTask = this.dialog.open(DialogTaskComponent, {
          width: '70%',
          data: { question: this.question }
        });

        dTask.afterClosed().subscribe(result => {
          this.emitText.emit(result)
        });
        break;

      case "etiqueta":
        const dEtiqueta = this.dialog.open(DialogEtiquetaComponent, {
          width: '40%',
          data: { question: this.question }
        });

        dEtiqueta.afterClosed().subscribe(result => {
          this.emitText.emit(result)
        });
        break;

      case "colaborador":
        const dColaborador = this.dialog.open(DialogColaboradorComponent, {
          width: '25%',
          data: { question: this.question }
        });

        dColaborador.afterClosed().subscribe(result => {
          this.emitText.emit(result)
        });
        break;
    }
  }
}