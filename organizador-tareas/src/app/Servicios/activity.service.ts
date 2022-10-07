import { Injectable, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { BoardComponent } from '../board/board/board.component';
import { Columnas } from '../clases/Columnas.class';
import { Card, Column, Comment, Etiqueta } from '../models/column.model';
import { ColumnasService } from './columnas.service';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {
    columnasJson: string;
    columnasJsonParse: string;
    codigoTablero: string | null;

    constructor(private columnasService: ColumnasService,
        private spinner: NgxSpinnerService,
        private router: Router) {
        this.columnasJson = '';
        this.columnasJsonParse = '';
        this.codigoTablero = '';
    }

    public initBoard: Column[] = //this.getColumnById(0);
    [
        /*{
            id: 1,
            title: 'Tareas por hacer',
            color: '#009886',
            list: [
                {
                    id: 1,
                    text: "Primera tarea",
                    like: 2,
                    descripcion: "",
                    fechaInicial: "",
                    fechaFin: "",
                    usuarioAsignado: "",
                    prioridad: "",
                    comments: [],
                    activities: []
                },
                {
                    id: 2,
                    text: "Segunda tarea",
                    like: 2,
                    descripcion: "",
                    fechaInicial: "",
                    fechaFin: "",
                    usuarioAsignado: "",
                    prioridad: "",
                    comments: [],
                    activities: []
                },
            ]
        },*/
        
    ]

    public board: Column[] = this.initBoard
    public board$ = new BehaviorSubject<Column[]>(this.initBoard)

    getBoard$() {
        return this.board$.asObservable()
    }

    changeColumnColor(color: string, columnId: number) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                column.color = color;
            }
            return column;
        });
        this.board$.next([...this.board]);
    }

    async addColumn(title: string, idTablero: any) {
        const newColumn: Column = {
            id: Date.now(),
            title: title,
            color: '#009886',
            list: [],
        };

        this.board = [...this.board, newColumn];
        this.saveChanges(idTablero);
        this.board$.next([...this.board]);
    }

    addCard(text: string, columnId: number, tableroId: string | null) {
        this.spinner.show();
        const newCard: Card = {
            id: Date.now(),
            text: text[0],
            descripcion: text[1],
            fechaInicial: text[2],
            fechaFin: text[3],
            usuarioAsignado: text[4],
            prioridad: text[5],
            like: 0,
            comments: [],
            activities: []
        };

        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                column.list = [newCard, ...column.list];
            }
            return column;
        });

        // Guardar los cambios realizados
        this.saveChanges(tableroId);

        this.board$.next([...this.board]);
    }

    deleteColumn(columnId: number, tableroId: string | null) {
        this.board = this.board.filter((column: Column) => column.id !== columnId);
        this.saveChanges(tableroId);
        this.board$.next([...this.board]);
    }

    deleteCard(cardId: number, columnId: number, tableroId: string | null) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                column.list = column.list.filter((card: Card) => card.id !== cardId);
            }
            return column;
        });
        this.saveChanges(tableroId);
        this.board$.next([...this.board]);
    }

    changeLike(cardId: number, columnId: number, increase: boolean) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const list = column.list.map((card: Card) => {
                    if (card.id === cardId) {
                        if (increase) {
                            card.like++;
                        } else {
                            if (card.like > 0) {
                                card.like--;
                            }
                        }
                    }
                    return card;
                });

                column.list = list;
                return column;
            } else {
                return column;
            }
        });

        this.board$.next([...this.board]);
    }

    addComment(columnId: number, cardId: number, text: string) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const list = column.list.map((card: Card) => {
                    if (card.id === cardId) {
                        const newComment = {
                            id: Date.now(),
                            text,
                        };
                        card.comments = [newComment, ...card.comments];
                    }
                    return card;
                });

                column.list = list;
            }
            return column;
        });

        this.board$.next([...this.board]);
    }

    deleteComment(columnId: number, itemId: number, commentId: number) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const list = column.list.map((item) => {
                    if (item.id === itemId) {
                        item.comments = item.comments.filter((comment: Comment) => {
                            return comment.id !== commentId
                        })
                    }
                    return item
                })
                column.list = list
            }
            return column
        })
        this.board$.next([...this.board])
    }

    getColumnById(codigoTablero: any): Column[] {
        this.spinner.show();
        //Limpiar board
        this.board = [];
        this.board$ = new BehaviorSubject<Column[]>([])
        setTimeout(() => {

            // Obtener el codigo del tablero en base a la ruta
            if (codigoTablero == 0) {
                this.router.navigate([`tablero-principal`]);
            } else {
                this.codigoTablero = this.columnasService.codigoTablero;
                let columnas: String;
                let returnColumnas: Column[];
                console.log()
                //Obtener las columnas segun el codigo del tablero
                this.columnasService.getColumnaByCodigo(codigoTablero).subscribe(res => {
                    this.spinner.hide();
                    if (res.length == 0) {
                        Swal.fire(
                            'Tablero vacío',
                            'Aún no existen listas de tareas creadas para este tablero, intenta crear una nueva lista presionando el boton "Nueva Columna"',
                            'info'
                        )
                        returnColumnas = [];
                        this.board = returnColumnas;
                        this.board$ = new BehaviorSubject<Column[]>(returnColumnas)
                    } else {
                        columnas = String(res[0].COLUMNAS)
                        returnColumnas = JSON.parse(String(columnas));
                        this.board = returnColumnas;
                        this.board$ = new BehaviorSubject<Column[]>(returnColumnas)
                    }
                    return returnColumnas;
                })
            }

        // Obtener el codigo del tablero en base a la ruta
        if (codigoTablero == 0) {
            this.router.navigate([`tablero-principal`]);
        } else {
            this.codigoTablero = this.columnasService.codigoTablero;
            let columnas: String;
            let returnColumnas: Column[];
            console.log()
            //Obtener las columnas segun el codigo del tablero
            this.columnasService.getColumnaByCodigo(codigoTablero).subscribe(res => {
                this.spinner.hide();
                if (res.length == 0) {
                    Swal.fire(
                        'Tablero vacío',
                        'Aún no existen listas de tareas creadas para este tablero, intenta crear una nueva lista presionando el boton "Nueva Lista de Tareas"',
                        'info'
                    )
                    returnColumnas = [];
                    this.board = returnColumnas;
                    this.board$ = new BehaviorSubject<Column[]>(returnColumnas)
                } else {
                    columnas = String(res[0].COLUMNAS)
                    returnColumnas = JSON.parse(String(columnas));
                    this.board = returnColumnas;
                    this.board$ = new BehaviorSubject<Column[]>(returnColumnas)
                }
                return returnColumnas;
            })
        }

        }, 1000);
        return []
    }

    async saveColumn(codigoTablero: any, saveColumns: any) {
        this.spinner.show();
        await this.columnasService.getColumnaByCodigo(codigoTablero).subscribe(res => {
            this.spinner.hide();
            if (res.length == 0) {
                this.columnasService.crearColumna(saveColumns).subscribe(res => {
                    console.log(saveColumns)
                    this.spinner.hide();
                }, err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido un error, por favor intente más tarde.'
                    })
                })
            } else {
                this.columnasService.updateColumna(saveColumns).subscribe(res => {
                    this.spinner.hide();
                }, err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido un error, por favor intente más tarde.'
                    })
                })
                this.spinner.hide();
            }
        }, err => {
            this.spinner.hide();
        });
    }

    saveChanges(id: string | null) {
        // Guardar los cambios realizados
        this.columnasJson = JSON.stringify(this.board);
        const saveColumns = {
            ID: id,
            TABLERO: id,
            COLUMNAS: this.columnasJson
        }

        this.saveColumn(id, saveColumns);
    }

    //etiqueta
    addEtiqueta(text: string, idTablero: any) {
        this.spinner.show();
        const newEtiqueta: Etiqueta = {
            id: Date.now(),
            text: text,
        };

        this.board = [...this.board];
        this.saveChanges(idTablero);
        this.board$.next([...this.board]);

    }

}