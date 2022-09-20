import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/Servicios/board.service';
import { ProyectosServiceService } from 'src/app/Servicios/proyectos-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardDetalle } from 'src/app/clases/boardDetalle.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  tablero: any = [];
  nombreProyecto: String;

  constructor(
    public boardService: BoardService,
    private tablerosService: ProyectosServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nombreProyecto = '';
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const codigoTablero = params.get('codigo_tablero');
      this.tablero = await this.getBoardData(codigoTablero);
    });

  }

  onColorChange(color: string, columnId: number) {
    this.boardService.changeColumnColor(color, columnId)
  }

  onAddCard(text: string, columnId: number) {
    if (text) {
      this.boardService.addCard(text, columnId)
    }
  }

  onDeleteColumn(columnId: number) {
    this.boardService.deleteColumn(columnId)
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId)
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
  }

  //Agregar nueva columna
  addColumn(event: string) {
    if (event) {
      this.boardService.addColumn(event)
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
