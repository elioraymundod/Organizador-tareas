import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DialogSeeTaskComponent } from '../dialog-see-task/dialog-see-task.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

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
    console.log('la procedencia es ', this.procedencia)
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
    }
  }
}