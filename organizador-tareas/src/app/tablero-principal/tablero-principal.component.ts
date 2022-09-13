import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProyectosServiceService } from '../Servicios/proyectos-service.service';
declare let $: any;

@Component({
  selector: 'app-tablero-principal',
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Nombre', 'Abreviatura', 'Descripcion', 'Responsable', 'Acciones']
  titulo: String;
  crearProyecto: FormGroup

  constructor(private _formBuilder: FormBuilder,
              private proyectosService: ProyectosServiceService,
              private activatedRoute: ActivatedRoute, 
              private router: Router) {
    this.titulo = 'Organizador de Tareas';
    this.crearProyecto = this._formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      abreviatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

  }

  async ngOnInit() {
    //Obtener los tableros y mostrarlos en la tabla
    await this.obtenerAllTableros();    
  }

  guardarProyecto(datos: any){
    const proyecto = {
      ID: 4,
      NOMBRE: this.crearProyecto.get('nombreProyecto')?.value,
      ABREVIATURA: this.crearProyecto.get('abreviatura')?.value,
      DESCRIPCION: datos.descripcion,
      FECHA_CREACION: null,
      USUARIO_CREACION: 'elio',
      FECHA_MODIFICACION: null,
      USUARIO_MODIFICACION: ''
    }

    this.proyectosService.crearProyecto(proyecto).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El proyecto se creó correctamente.'
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el proyecto.'
      })
    })
    console.log(proyecto)
  }

  async obtenerAllTableros(){
    this.proyectosService.getAllProyectos().subscribe(res => {
      this.dataSource.data = res;
    }, err => {
      console.error(err);
    });
  }

  verTablero(complementoRuta: any){
    console.log(complementoRuta)
    this.router.navigate([`tablero/${complementoRuta}`]);
  }
}
