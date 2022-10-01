import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-see-task',
  templateUrl: './dialog-see-task.component.html',
  styleUrls: ['./dialog-see-task.component.css']
})
export class DialogSeeTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSeeTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
