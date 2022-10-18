import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnasService } from 'src/app/Servicios/columnas.service';
import { EtiquetasService } from 'src/app/Servicios/etiquetas.service';
import { LoginService } from 'src/app/Servicios/LoginService.service';
import Swal from 'sweetalert2';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-etiqueta',
  templateUrl: './dialog-etiqueta.component.html',
  styleUrls: ['./dialog-etiqueta.component.css']
})
export class DialogEtiquetaComponent implements OnInit {
  formdata: FormGroup
  spinner: any;
  date: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formbuilder: FormBuilder,
    private etiquetaService: EtiquetasService,
    private columnasService: ColumnasService,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {
    this.formdata = this._formbuilder.group({
      nombre: ['', Validators.required]
    })
    this.date = new Date();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  guardarEtiqueta(data: any) {
    const etiqueta = {
      NOMBRE: data.nombre,
      FECHA_CREACION: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      USUARIO_CREACION: this.loginService.login,
      FECHA_MODIFICACION: '',
      USUARIO_MODIFICACION: '',
      TABLERO: this.columnasService.codigoTablero
    }
    this.dialogRef.close();
    this.etiquetaService.crearEtiqueta(etiqueta).subscribe(res => {
      //mensaje
     // this.spinner.hide();
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'La etiqueta se creó correctamente.'
      })
    }, err => {
      //error
    //  this.spinner.hide();
    /*  Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intente más tarde.'
      }) */
    })
  }
}