export interface Comment {
    id: number,
    text: string,
}

export interface Card {
    id: number,
    text: string,
    like: number,
    descripcion: string,
    fechaInicial: string,
    fechaFin: string,
    usuarioAsignado: string,
    prioridad: string,
    comments: Comment[]
}

export interface Column {
    id: number,
    title: string,
    color: string,
    list: Card[]
}