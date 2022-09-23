import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
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
    console.log("la procedencia es", this.procedencia)
    if(this.procedencia == "columna"){
      const dialogRef = this.dialog.open(DialogBodyComponent, {
        width: '400px',
        data: { question: this.question }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.emitText.emit(result)
      });
    }
    else if(this.procedencia == "task"){
      const dialogRef = this.dialog.open(DialogTaskComponent, {
        width: '70%',
        data: { question: this.question }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.emitText.emit(result)
      });
    }
    
  }
}