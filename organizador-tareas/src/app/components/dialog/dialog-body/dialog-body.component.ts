import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

 /* tareasService: any;
  crearTarea: FormGroup
 
  
  constructor(private _formBuilder: FormBuilder,
            private spinner: NgxSpinnerService){
  this.crearTarea = this._formBuilder.group({
    nombreTarea: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async guardarTarea(datos: any){
    this.spinner.show();
    const tarea = {
      NOMBRE: this.crearTarea.get('nombreTarea')?.value,
      DESCRIPCION: datos.descripcion,
      INFORMADOR: null,
      USUARIO_ASIGANDO: null,
      PRIORIDAD: null,
      PROGRESO: null,
      ESFUERZO: null,
      ETIQUETA: null,
      FECHA_INICIO: null,
      FECHA_FIN: null,
      FECHA_CREACION: null,
      USUARIO_CREACION: 'MELANI',
      FECHA_MODIFICACION: '',
      USUARIO_MODIFICACION: ''
    }

    this.tareasService.crearTarea(tarea).subscribed((res: any) => {
      this.spinner.hide();
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'La tarea se creó correctamente.'
      })

    }, (err: any) => {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intente más tarde.'
      })
    })
    this.crearTarea.reset();
    this.spinner.show();
  }


  limpiarForms(): void{
    this.crearTarea.reset();
  }*/
  

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  

}