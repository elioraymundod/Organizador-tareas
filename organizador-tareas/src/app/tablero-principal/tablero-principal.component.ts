import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { EditTableroComponent } from '../components/dialog/edit-tablero/edit-tablero.component';
import { BoardService } from '../Servicios/board.service';
import { LoginService } from '../Servicios/LoginService.service';
import { ProyectosServiceService } from '../Servicios/proyectos-service.service';
declare let $: any;

@Component({
  selector: 'app-tablero-principal',
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css'],
})
export class TableroPrincipalComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'Nombre',
    'Abreviatura',
    'Descripcion',
    'Privacidad',
    'Acciones',
  ];
  titulo: String;
  crearProyecto: FormGroup;
  estado = [
    { id: 1, name: 'Público' },
    { id: 2, name: 'Privado' },
  ];
  estado_usuario: number = 1;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private proyectosService: ProyectosServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private boardService: BoardService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.titulo = 'Organizador de Tareas';
    this.crearProyecto = this._formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      abreviatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      privacidad: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    if (this.loginService.userValid == false) {
      this.spinner.hide();
      this.router.navigate(['login']);
    } else {
      window.localStorage.clear();
      this.spinner.show();
      //Obtener los tableros y mostrarlos en la tabla
      await this.obtenerAllTableros(this.loginService.idUser);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async guardarProyecto(datos: any) {
    this.spinner.show();
    const proyecto = {
      NOMBRE: this.crearProyecto.get('nombreProyecto')?.value,
      ABREVIATURA: this.crearProyecto.get('abreviatura')?.value,
      DESCRIPCION: datos.descripcion,
      FECHA_CREACION: null,
      USUARIO_CREACION: this.loginService.idUser,
      FECHA_MODIFICACION: null,
      USUARIO_MODIFICACION: '',
      PRIVACIDAD: datos.privacidad,
    };

    this.proyectosService.crearProyecto(proyecto).subscribe(
      (res) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'El tablero se creó correctamente.',
        });
      },
      (err) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error, por favor intente más tarde.',
        });
      }
    );
    this.crearProyecto.reset();
    this.spinner.show();
    this.obtenerAllTableros(this.loginService.idUser);
  }

  // Obtener todos los tableros creados
  obtenerAllTableros(usuario: number) {
    this.proyectosService.getAllProyectos(usuario).subscribe(
      (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  // Visualizar las tareas de un tablero
  verTablero(complementoRuta: any) {
    this.boardService.getColumnById(complementoRuta);
    this.router.navigate([`tablero/${complementoRuta}`]);
  }

  // Editar tablero
  async editarTablero(data: any) {
    //console.log('editando tablero', data);
    await Swal.fire({
      icon: 'question',
      title: 'Desea editar este tablero?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
      allowOutsideClick: false,
      backdrop: false,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(EditTableroComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: data,
        });
        dialogRef.afterClosed().subscribe(async (result) => {
          if (result) {
            //console.log('Dialogo cerrado', result);
            await Swal.fire({
              icon: 'success',
              title: `${result}`,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false,
              backdrop: false,
            });
            this.obtenerAllTableros(this.loginService.idUser);
          }
        });
      }
    });
  }

  // Eliminar tablero
  async eliminarTablero(idTablero: number) {
    console.log('eliminando tablero', idTablero);
    await Swal.fire({
      icon: 'question',
      title: 'Desea eliminar este tablero?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
      allowOutsideClick: false,
      backdrop: false,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const delete$ = this.proyectosService.deleteProyecto(idTablero);
        await firstValueFrom(delete$)
          .then(async (res) => {
            console.log('respuesta ', res);
            await Swal.fire({
              icon: 'success',
              title: `${res.mesage}`,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false,
              backdrop: false,
            });
            this.obtenerAllTableros(this.loginService.idUser);
          })
          .catch((error) => {
            console.error('error', error);
          });
      }
    });
  }

  filtroTableros(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  limpiarForms() {
    this.crearProyecto.reset();
  }

  cerrarSesion() {
    this.loginService.userValid = false;
    this.router.navigate(['login']);
  }
}
