import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/Servicios/board.service';
import { ProyectosServiceService } from 'src/app/Servicios/proyectos-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardDetalle } from 'src/app/clases/boardDetalle.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnasService } from 'src/app/Servicios/columnas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  tablero: any = [];
  nombreProyecto: String;
  public codigoTablero: string | null;


  constructor(
    public boardService: BoardService,
    private tablerosService: ProyectosServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private columnasService: ColumnasService
  ) {
    this.nombreProyecto = '';
    this.codigoTablero = '';
  }

  async ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe(async params => {
      const codigoTablero = params.get('codigo_tablero');
      this.codigoTablero = codigoTablero;
      this.tablero = await this.getBoardData(codigoTablero);
    });
    this.columnasService.codigoTablero = this.codigoTablero;
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

  //Obtener informacion de un tablero
  async getBoardData(codigoTablero: any) {
    await this.tablerosService.getTableroByCodigo(codigoTablero).subscribe((res: BoardDetalle[]) => {
      this.nombreProyecto = res[0].NOMBRE + ' (' + res[0].ABREVIATURA + ')';
    }, err => {
      console.error(err)
    })
  }

  //Navegar al board principal (vista de todos los tableros)
  volverMenuPrincipal() {
    this.router.navigate(['tablero-principal']);
  }
}
