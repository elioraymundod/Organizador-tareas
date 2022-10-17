import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/Servicios/board.service';
import { ProyectosServiceService } from 'src/app/Servicios/proyectos-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardDetalle } from 'src/app/clases/boardDetalle.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnasService } from 'src/app/Servicios/columnas.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeeTaskComponent } from 'src/app/components/dialog/dialog-see-task/dialog-see-task.component';
import { LoginService } from 'src/app/Servicios/LoginService.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  tablero: any = [];
  nombreProyecto: String;
  public codigoTablero: string | null;
  infoTablero: any;


  constructor(
    public boardService: BoardService,
    private tablerosService: ProyectosServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private columnasService: ColumnasService,
    public dialog: MatDialog,
    public loginService: LoginService
  ) {
    this.nombreProyecto = '';
    this.codigoTablero = '';
  }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe(async params => {
      const codigoTablero = params.get('codigo_tablero');
      this.codigoTablero = codigoTablero;
      this.tablero = this.getBoardData(codigoTablero);
    });
    this.columnasService.codigoTablero = this.codigoTablero;
    /*if(this.loginService.userValid == false ){
      this.router.navigate(['login'])
    } else {
      
    }*/
  }

  onColorChange(color: string, columnId: number) {
    this.boardService.changeColumnColor(color, columnId)
    this.boardService.saveChanges(this.codigoTablero);
  }

  onAddCard(text: string, columnId: number) {
    if (text) {
      this.boardService.addCard(text, columnId, this.codigoTablero)
    }
  }

  onEtiqueta(text: string) {
    if (text) {
      this.boardService.etiqueta(text, this.codigoTablero)
    }
  }

  onDeleteColumn(columnId: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta lista con todas sus tareas?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.boardService.deleteColumn(columnId, this.codigoTablero);
        Swal.fire({
          title: 'Lista de Tareas eliminada con éxito',
          icon: 'success'
        }
        )
      }
    })
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId, this.codigoTablero)
  }

  onChangeLike(event: { card: any, increase: boolean }, columnId: number) {
    const { card: { id }, increase } = event
    this.boardService.changeLike(id, columnId, increase)
  }

  onAddComment(event: { id: number, text: string }, columnId: number) {
    this.boardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment: { id: any; }, columnId: any, item: { id: any; }) {
    this.boardService.deleteComment(columnId, item.id, comment.id)
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.boardService.saveChanges(this.codigoTablero);
  }

  //Agregar nueva columna
  addColumn(event: string) {
    if (event) {
      this.boardService.addColumn(event, this.codigoTablero)
    }
  }

   //Agregar nueva etiqueta
   addEtiqueta(event: string) {
    if (event) {
      this.boardService.addEtiqueta(event, this.codigoTablero)
    }
  }

  //Obtener informacion de un tablero
  getBoardData(codigoTablero: any) {
    this.tablerosService.getTableroByCodigo(codigoTablero).subscribe((res: BoardDetalle[]) => {
      this.nombreProyecto = res[0].NOMBRE + ' (' + res[0].ABREVIATURA + ')';
      this.columnasService.nombreTablero = this.nombreProyecto;
      if(res[0].PRIVACIDAD == 1) {
        this.columnasService.tableroPublico = true;        
      }
    }, err => {
      console.error(err)
    })
  }

  //Navegar al board principal (vista de todos los tableros)
  volverMenuPrincipal() {
    this.router.navigate(['tablero-principal']);
  }

  openTask(data: any, color: any, columnId: any) {
    let backColor: string = "";
    switch (color) {
      case "#CD6155":
        backColor = "#F2D7D5";
        break;

      case "#009886":
        backColor = "#D0ECE7";
        break;

      case "#1976D2":
        backColor = "#D4E6F1";
        break;

      case "#6e1d96":
        backColor = "#E8DAEF";
        break;

      case "#FF8F00":
        backColor = "#FCF3CF";
        break;

      case "#EC407A":
        backColor = "#F8BBD0";
        break;

      case "#34495E":
        backColor = "#D6DBDF";
        break;
    }

    const dSeeTask = this.dialog.open(DialogSeeTaskComponent, {
      width: '90%',
      data: {
        question: data.text,
        color: color,
        backgroundColor: backColor,
        descripcion: data.descripcion,
        usuarioAsignado: data.usuarioAsignado,
        prioridad: data.prioridad,
        fechaFin: data.fechaFin,
        fechaInicio: data.fechaInicial,
        columnId: columnId,
        cardId: data.id,
        informador: data.informador,
        esfuerzo: data.esfuerzo
      }
    });
    /*
        dSeeTask.afterClosed().subscribe(result => {
          this.emitText.emit(result)
        });*/
  }

  cerrarSesion(){
    this.loginService.userValid = false;
    this.router.navigate(['login']);
  }
}
