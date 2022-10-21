import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ProyectosServiceService } from 'src/app/Servicios/proyectos-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tablero',
  templateUrl: './edit-tablero.component.html',
  styleUrls: ['./edit-tablero.component.css'],
})
export class EditTableroComponent implements OnInit {
  dataTablero: any;
  formEdit!: FormGroup;
  estado = [
    { id: 1, name: 'Público' },
    { id: 2, name: 'Privado' },
  ];
  constructor(
    private dialogRef: MatDialogRef<EditTableroComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private proyectosService: ProyectosServiceService
  ) {
    this.formEdit = this.formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      abreviatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      privacidad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.dataTablero = this.dialogRef.componentInstance.data;
    //console.log('data de tablero', this.dataTablero);
    this.formEdit.get('nombreProyecto')?.setValue(this.dataTablero.NOMBRE);
    this.formEdit.get('abreviatura')?.setValue(this.dataTablero.ABREVIATURA);
    this.formEdit.get('descripcion')?.setValue(this.dataTablero.DESCRIPCION);
    this.formEdit.get('privacidad')?.setValue(this.dataTablero.PRIVACIDAD);
  }
  cancelar() {
    console.log('cancelando');
    this.dialogRef.close();
  }

  async guardar() {
    const data = {
      ID: this.dataTablero.ID,
      NOMBRE: this.formEdit.get('nombreProyecto')?.value,
      ABREVIATURA: this.formEdit.get('abreviatura')?.value,
      DESCRIPCION: this.formEdit.get('descripcion')?.value,
      PRIVACIDAD: this.formEdit.get('privacidad')?.value,
    };
    //console.log('guardando info', data);
    const data$ = this.proyectosService.putProyecto(data);
    await firstValueFrom(data$)
      .then((res) => {
        //console.log('respuesta =>', res);
        this.dialogRef.close(res.mesage);
      })
      .catch((err) => {
        console.error('error al actualizar tablero', err);
      });
  }
}
