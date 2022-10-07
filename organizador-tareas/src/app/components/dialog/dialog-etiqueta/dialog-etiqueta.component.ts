import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtiquetasService } from 'src/app/Servicios/etiquetas.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-dialog-etiqueta',
  templateUrl: './dialog-etiqueta.component.html',
  styleUrls: ['./dialog-etiqueta.component.css']
})
export class DialogEtiquetaComponent implements OnInit {
formdata: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formbuilder: FormBuilder, 
    private etiquetaService: EtiquetasService
  ) {
    this.formdata = this._formbuilder.group({
      nombre:['', Validators.required]
    })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  guardarEtiqueta(data: any){
    const etiqueta={
      NOMBRE:data.nombre
    }
    this.dialogRef.close();
    this.etiquetaService.crearEtiqueta(etiqueta).subscribe(res => {
//mensaje
    }, err=>{
      //error
    })
  }

}
