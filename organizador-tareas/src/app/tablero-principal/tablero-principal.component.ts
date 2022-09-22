import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { BoardService } from '../Servicios/board.service';
import { ProyectosServiceService } from '../Servicios/proyectos-service.service';
declare let $: any;

@Component({
  selector: 'app-tablero-principal',
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent implements OnInit{

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Nombre', 'Abreviatura', 'Descripcion', 'Acciones']
  titulo: String;
  crearProyecto: FormGroup

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private _formBuilder: FormBuilder,
              private proyectosService: ProyectosServiceService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private boardService: BoardService) {
    this.titulo = 'Organizador de Tareas';
    this.crearProyecto = this._formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      abreviatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    window.localStorage.clear();
    this.spinner.show();
    //Obtener los tableros y mostrarlos en la tabla
    await this.obtenerAllTableros();  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async guardarProyecto(datos: any){
    this.spinner.show();
    const proyecto = {
      NOMBRE: this.crearProyecto.get('nombreProyecto')?.value,
      ABREVIATURA: this.crearProyecto.get('abreviatura')?.value,
      DESCRIPCION: datos.descripcion,
      FECHA_CREACION: null,
      USUARIO_CREACION: 'elio',
      FECHA_MODIFICACION: null,
      USUARIO_MODIFICACION: ''
    }

    this.proyectosService.crearProyecto(proyecto).subscribe(res => {
      this.spinner.hide();
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El tablero se creó correctamente.'
      })
    }, err => {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intente más tarde.'
      })
    })
    this.crearProyecto.reset();
    this.spinner.show();
    await this.obtenerAllTableros();   
  }

  // Obtener todos los tableros creados
  async obtenerAllTableros(){
    this.proyectosService.getAllProyectos().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      console.error(err);
      this.spinner.hide();
    });
  }

  // Visualizar las tareas de un tablero
  verTablero(complementoRuta: any){
    this.boardService.getColumnById(complementoRuta);
    this.router.navigate([`tablero/${complementoRuta}`]);
  }

  filtroTableros(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  limpiarForms(){
    this.crearProyecto.reset();
  }
}
